from typing import Optional, Union
import jwt
import datetime

from config import get_secret


class Jwt:
    def __init__(self):
        self.algorithm = "HS256"
        self.secret_key = get_secret("AUTH_SECRET_KEY")
        self.access_token_lifetime = datetime.timedelta(minutes=15)
        self.refresh_token_lifetime = datetime.timedelta(days=30)

    def _create_token(self, payloads: dict, lifetime: datetime.timedelta) -> str:
        payloads["exp"] = datetime.datetime.utcnow() + lifetime
        return jwt.encode(payloads, key=self.secret_key, algorithm=self.algorithm)

    def create_access_token(self, payloads: dict) -> str:
        return self._create_token(payloads, self.access_token_lifetime)

    def create_refresh_token(self, payloads: dict) -> str:
        return self._create_token(payloads, self.refresh_token_lifetime)

    def verify_token(self, token: str) -> Union[dict, str]:
        try:
            return jwt.decode(token, key=self.secret_key, algorithms=self.algorithm)
        except jwt.ExpiredSignatureError:
            return {"success": False, "msg": "만료 된 토큰입니다."}
        except jwt.InvalidTokenError:
            return {"success": False, "msg": "토큰 검증이 실패하였습니다."}

    def refresh(self, refresh_token: str) -> Optional[str]:
        payload = self.verify_token(refresh_token)

        if isinstance(payload, str):
            return None

        return self.create_access_token(payload)
