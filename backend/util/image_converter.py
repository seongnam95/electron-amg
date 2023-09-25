import os
import uuid
import base64
import cv2
import io
import numpy as np
from PIL import Image


# 현재 스크립트의 디렉토리를 기준으로 uploads 폴더의 경로를 설정합니다.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# uploads 폴더가 없으면 생성합니다.
os.makedirs(UPLOAD_DIR, exist_ok=True)


def base64_to_image(base64_str: str, file_name: str = f"{uuid.uuid4()}.jpeg") -> str:
    file_path = os.path.join(UPLOAD_DIR, file_name)

    # base64 인코딩된 문자열
    # 이 문자열에서 실제 base64 데이터만 추출합니다.
    prefix, base64_data = base64_str.split(
        ","
    )  # "data:image/jpeg;base64," 부분과 실제 데이터 부분을 분리합니다.

    img_data = base64.b64decode(base64_data)
    dataBytesIO = io.BytesIO(img_data)
    image = Image.open(dataBytesIO)

    # 이미지 데이터를 파일로 저장합니다.
    image.save(file_path)

    return file_name


def image_to_base64(file_name: str):
    file_path = os.path.join(UPLOAD_DIR, file_name)
    print(file_path)
    if not os.path.exists(file_path):
        return None

    with open(file_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode("utf-8")

    return encoded_string
