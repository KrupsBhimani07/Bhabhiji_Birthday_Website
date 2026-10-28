
from flask import Flask, render_template, send_file, request
import json
import qrcode
from pathlib import Path
from io import BytesIO

app = Flask(__name__)

# Project folder path
BASE_DIR = Path(__file__).resolve().parent

# JSON data file
DATA_FILE = BASE_DIR / "memories.json"


def load_memories():
    """
    Read birthday information and memories from memories.json
    """

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data


@app.route("/")
def home():
    """
    Birthday website home page
    """

    memories = load_memories()

    return render_template(
        "index.html",
        memories=memories
    )


@app.route("/qr.png")
def generate_qr():
    """
    Generate QR code for the current website URL
    """

    website_url = request.url_root

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4
    )

    qr.add_data(website_url)
    qr.make(fit=True)

    qr_image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    image_buffer = BytesIO()

    qr_image.save(image_buffer, format="PNG")

    image_buffer.seek(0)

    return send_file(
        image_buffer,
        mimetype="image/png",
        download_name="birthday-website-qr.png"
    )


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
