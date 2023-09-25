import os
import uuid
import base64

# 현재 스크립트의 디렉토리를 기준으로 uploads 폴더의 경로를 설정합니다.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# uploads 폴더가 없으면 생성합니다.
os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_base64_image(base64_str: str) -> str:
    image_data = base64.b64decode(base64_str)
    file_name = f"{uuid.uuid4()}.jpeg"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    prefix, base64_data = base64_str.split(
        ","
    )  # "data:image/jpeg;base64," 부분과 실제 데이터 부분을 분리합니다.

    # base64 데이터를 디코딩하여 바이트 데이터를 얻습니다.
    image_data = base64.b64decode(base64_data)

    # 안전한 파일 이름을 생성합니다. (여기서는 UUID를 사용하였습니다.)
    filename = os.path.join(file_path, f"{uuid.uuid4().hex}.jpeg")

    # 이미지 데이터를 파일로 저장합니다.
    with open(filename, "wb") as f:
        f.write(image_data)

    return file_name
