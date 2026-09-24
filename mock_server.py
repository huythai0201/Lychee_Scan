#!/usr/bin/env python3
"""Mock server cho API POST /predict — dùng để test UI khi backend thật chưa sẵn sàng.

Chạy:  python3 mock_server.py        (lắng nghe http://localhost:8000)

Trả về kết quả ngẫu nhiên đúng format:
  {"label", "label_display", "confidence", "probs"}
"""

import json
import random
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

LABELS = {
    "chua_chin": "Chưa chín",
    "chin_toi": "Chín tới",
    "chin_ky": "Chín kỹ",
}

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
}


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload=None):
        body = json.dumps(payload).encode() if payload is not None else b""
        self.send_response(code)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if body:
            self.wfile.write(body)

    def do_OPTIONS(self):  # preflight CORS
        self._send(204)

    def do_POST(self):
        if self.path != "/predict":
            return self._send(404, {"detail": "Not Found"})

        length = int(self.headers.get("Content-Length", 0))
        ctype = self.headers.get("Content-Type", "")
        body = self.rfile.read(length) if length else b""

        if "multipart/form-data" not in ctype or b"filename" not in body:
            return self._send(422, {"detail": "Thiếu file ảnh trong FormData"})

        time.sleep(random.uniform(0.8, 1.8))  # giả lập độ trễ suy luận

        label = random.choice(list(LABELS))
        winner = random.uniform(0.72, 0.97)
        rest = 1 - winner
        other = [k for k in LABELS if k != label]
        p1 = random.uniform(0.05, 0.95) * rest
        probs = {label: round(winner, 4), other[0]: round(p1, 4)}
        probs[other[1]] = round(1 - winner - p1, 4)

        self._send(200, {
            "label": label,
            "label_display": LABELS[label],
            "confidence": round(winner, 4),
            "probs": probs,
        })

    def log_message(self, fmt, *args):
        print(f"[mock] {self.address_string()} - {fmt % args}")


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8000), Handler)
    print("Mock /predict đang chạy tại http://localhost:8000 (Ctrl+C để dừng)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
