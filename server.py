#!/usr/bin/env python3
"""Backend thật cho API POST /predict — chạy model MobileNetV3-Small (CPU, không cần GPU).

Nạp 5 checkpoint fold của Docs/outputs/03_cnn/mobilenet_v3_small_none/ và ensemble
(trung bình xác suất) để cho kết quả ổn định hơn 1 fold đơn lẻ. Model rất nhẹ nên
tổng suy luận 5-fold trên CPU chỉ mất khoảng 50-80ms/ảnh.

Cài đặt (một lần):
    pip install torch torchvision pillow flask

Chạy:
    python server.py        (lắng nghe http://localhost:8000, giống mock_server.py)

Trả về đúng format mà app.js đang mong đợi:
    {"label", "label_display", "confidence", "probs", "brix_pred"}
"""

import io
import sys
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision
from flask import Flask, jsonify, request
from PIL import Image, UnidentifiedImageError

MODEL_DIR = Path(__file__).parent / "Docs" / "outputs" / "03_cnn" / "mobilenet_v3_small_none"
FOLDS = [0, 1, 2, 3, 4]
IMG_SIZE = 224
IMAGENET_MEAN = torch.tensor([0.485, 0.456, 0.406]).view(1, 3, 1, 1)
IMAGENET_STD = torch.tensor([0.229, 0.224, 0.225]).view(1, 3, 1, 1)

# Thứ tự lớp khớp cột "stage" (0/1/2) trong Docs/outputs/01_labels/labels_final.csv
STAGE_TO_KEY = ["chua_chin", "chin_toi", "chin_ky"]
LABEL_DISPLAY_VI = {
    "chua_chin": "Xanh",
    "chin_toi": "Chín tới",
    "chin_ky": "Quá chín",
}

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
}


class LycheeNet(nn.Module):
    """Khớp state_dict trong fold*.pt: backbone (MobileNetV3-Small features) + 2 head."""

    def __init__(self, n_classes: int):
        super().__init__()
        backbone = torchvision.models.mobilenet_v3_small(weights=None)
        self.backbone = backbone.features
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.head_cls = nn.Linear(576, n_classes)
        self.head_reg = nn.Linear(576, 1)

    def forward(self, x):
        feat = self.pool(self.backbone(x)).flatten(1)
        return self.head_cls(feat), self.head_reg(feat)


def load_ensemble():
    models = []
    brix_mu = brix_sd = None
    for fold in FOLDS:
        ckpt_path = MODEL_DIR / f"fold{fold}.pt"
        ckpt = torch.load(ckpt_path, map_location="cpu", weights_only=False)
        net = LycheeNet(n_classes=ckpt["n_classes"])
        net.load_state_dict(ckpt["state_dict"])
        net.eval()
        models.append(net)
        brix_mu, brix_sd = ckpt["brix_mu"], ckpt["brix_sd"]
    return models, brix_mu, brix_sd


print(f"[server] Đang nạp {len(FOLDS)} fold từ {MODEL_DIR} (CPU)...")
MODELS, BRIX_MU, BRIX_SD = load_ensemble()
print("[server] Model sẵn sàng.")

app = Flask(__name__)


def preprocess(image_bytes: bytes) -> torch.Tensor:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((IMG_SIZE, IMG_SIZE), Image.BILINEAR)
    x = torch.from_numpy(np.array(img)).permute(2, 0, 1).float().div(255.0).unsqueeze(0)
    x = (x - IMAGENET_MEAN) / IMAGENET_STD
    return x


@torch.no_grad()
def predict_image(image_bytes: bytes):
    x = preprocess(image_bytes)
    prob_sum = torch.zeros(1, 3)
    brix_sum = 0.0
    for net in MODELS:
        logits_cls, out_reg = net(x)
        prob_sum += F.softmax(logits_cls, dim=1)
        brix_sum += out_reg.item()
    probs = (prob_sum / len(MODELS)).squeeze(0)
    brix_pred = (brix_sum / len(MODELS)) * BRIX_SD + BRIX_MU

    pred_idx = int(torch.argmax(probs).item())
    label = STAGE_TO_KEY[pred_idx]
    probs_dict = {STAGE_TO_KEY[i]: round(float(probs[i]), 4) for i in range(3)}
    return {
        "label": label,
        "label_display": LABEL_DISPLAY_VI[label],
        "confidence": round(float(probs[pred_idx]), 4),
        "probs": probs_dict,
        "brix_pred": round(float(brix_pred), 2),
    }


@app.after_request
def add_cors(resp):
    for k, v in CORS_HEADERS.items():
        resp.headers[k] = v
    return resp


@app.route("/predict", methods=["OPTIONS"])
def predict_options():
    return "", 204


@app.route("/predict", methods=["POST"])
def predict_route():
    file = request.files.get("file")
    if file is None or file.filename == "":
        return jsonify({"detail": "Thiếu file ảnh trong FormData"}), 422

    raw = file.read()
    try:
        result = predict_image(raw)
    except UnidentifiedImageError:
        return jsonify({"detail": "File không phải ảnh hợp lệ"}), 422
    except Exception as exc:  # noqa: BLE001
        return jsonify({"detail": f"Lỗi suy luận: {exc}"}), 500

    return jsonify(result)


if __name__ == "__main__":
    print("Backend thật /predict đang chạy tại http://localhost:8000 (Ctrl+C để dừng)")
    app.run(host="127.0.0.1", port=8000, threaded=True)
