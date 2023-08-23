import jwt
import datetime
from typing import Optional, Union

from config import get_secret
from exceptions import TokenExpiredError, TokenInvalidError


class Jwt:
    def __init__(self):
        self.algorithm = "HS256"
        self.secret_key = get_secret("AUTH_SECRET_KEY")
        self.access_token_lifetime = datetime.timedelta(seconds=10)  # hours=1)
        self.refresh_token_lifetime = datetime.timedelta(seconds=20)  # days=1)

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
            raise TokenExpiredError("EXPIRED_TOKEN")
        except jwt.InvalidTokenError:
            raise TokenInvalidError("INVALID-TOKEN")

    def refresh(self, refresh_token: str) -> Optional[str]:
        payload = self.verify_token(refresh_token)

        if isinstance(payload, str):
            return None

        return self.create_access_token(payload)
