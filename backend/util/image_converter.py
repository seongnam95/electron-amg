import os
from typing import Optional
import uuid
import base64
import io
from PIL import Image


# 현재 스크립트의 디렉토리를 기준으로 uploads 폴더의 경로를 설정합니다.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# uploads 폴더가 없으면 생성합니다.
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Base64 데이터 이미지화 및 저장
def base64_to_image(base64_str: str) -> str:
    file_name = f"{uuid.uuid4()}.jpeg"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    _, base64_data = base64_str.split(",")

    img_data = base64.b64decode(base64_data)
    dataBytesIO = io.BytesIO(img_data)
    image = Image.open(dataBytesIO)

    # 이미지 데이터를 파일로 저장합니다.
    image.save(file_path)

    return file_name


# 이미지 파일 Base64 변환
def image_to_base64(file_name: str):
    file_path = os.path.join(UPLOAD_DIR, file_name)

    if not os.path.exists(file_path):
        return None

    with open(file_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode("utf-8")

    img_extension = file_name.split(".")[1]
    return f"data:image/{img_extension};base64,{encoded_string}"


# 이미지 파일 삭제
def remove_image(file_name: str):
    file_path = os.path.join(UPLOAD_DIR, file_name)
    os.remove(file_path)
