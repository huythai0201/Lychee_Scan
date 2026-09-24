# LycheeScan

AI chạy trong trình duyệt bằng ONNX Runtime Web. Máy chủ phục vụ giao diện,
ảnh và mô hình; không cần cài PyTorch trên Render.

## Deploy Render Web Service

Đẩy các file mới lên nhánh `main` trên GitHub trước khi deploy.

| Trường | Giá trị |
| --- | --- |
| Name | `lychee-scan` (hoặc tên riêng) |
| Language | `Python 3` |
| Branch | `main` |
| Region | `Singapore` |
| Root Directory | Để trống |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn web:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120 --access-logfile - --error-logfile -` |
| Compute | `Free` |
| Advanced → Health Check Path | `/healthz` |

Không cần biến môi trường bắt buộc hay API key. Render cấp `PORT` tự động;
`.python-version` chọn Python 3.13. Có thể thêm `PYTHONUNBUFFERED=1` để log
xuất ngay. Nhấn **Deploy web service**, sau đó mở URL Render cung cấp.

`render.yaml` chứa cấu hình tương đương cho Render Blueprint. Khi tạo Web
Service thủ công, tự điền các trường trên.

Commit cả `models/`, `Gallery/`, `Potrait/`, `index.html`, `app.js`, `styles.css`.
Các file `.onnx` phải là mô hình thật, không phải Git LFS pointer.
Trình duyệt cần Internet để tải ONNX Runtime từ jsDelivr.

Render Free ngủ sau 15 phút không có truy cập; lần mở tiếp theo có thể mất
khoảng một phút khởi động. Lần phân tích đầu cần tải mô hình về trình duyệt.

## Chạy local

```sh
pip install -r requirements.txt
python web.py
```

Mở http://localhost:8000/. Có thể dùng `python -m http.server 8000` để phục vụ
website tĩnh (không có `/healthz`).

`server.py` là backend PyTorch riêng cho `/predict`, không được giao diện
hiện tại gọi và không dùng trong cấu hình Render này. Dependency PyTorch
không nằm trong `requirements.txt` dành cho website.

Tài liệu: https://render.com/docs/deploy-flask và https://render.com/docs/free.
