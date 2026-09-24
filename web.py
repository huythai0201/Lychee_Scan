"""Serve the browser-based LycheeScan application on Render."""

import os
from pathlib import Path

from flask import Flask, abort, jsonify, send_from_directory

ROOT = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=None)
PUBLIC_FILES = {"index.html", "app.js", "styles.css"}
PUBLIC_DIRS = {"models", "Gallery", "Potrait"}


@app.get("/healthz")
def health():
    return jsonify(status="ok")


@app.get("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.get("/<path:filename>")
def public_file(filename):
    # Only publish website assets, never repository metadata or Python sources.
    if filename in PUBLIC_FILES:
        return send_from_directory(ROOT, filename)
    folder, separator, relative_path = filename.partition("/")
    if folder not in PUBLIC_DIRS or not separator:
        abort(404)
    return send_from_directory(ROOT / folder, relative_path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
