import jwt
import datetime


class Jwt:
    def __init__(self, secret_key):
        self.algorithm = "HS256"
        self.secret_key = secret_key
        self.access_token_lifetime = datetime.timedelta(minutes=15)
        self.refresh_token_lifetime = datetime.timedelta(days=30)

    def create_access_token(self, payloads):
        payloads["exp"] = datetime.datetime.utcnow() + self.access_token_lifetime
        return jwt.encode(payloads, key=self.secret_key, algorithm=self.algorithm)

    def create_refresh_token(self, payloads):
        payloads["exp"] = datetime.datetime.utcnow() + self.refresh_token_lifetime
        return jwt.encode(payloads, key=self.secret_key, algorithm=self.algorithm)

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, key=self.secret_key, algorithms=self.algorithm)
        except jwt.ExpiredSignatureError:
            return "토큰 인증 만료"
        except jwt.InvalidTokenError:
            return "토큰 검증 실패"
        return payload

    def refresh(self, refresh_token):
        payload = self.verify_token(refresh_token)
        if payload == "토큰 인증 만료" or payload == "토큰 검증 실패":
            return None
        # 새로운 access_token 발행
        return self.create_access_token()


if __name__ == "__main__":
    payload = {"id": "hwan"}
    my_jwt = Jwt(payload, "secret")

    access_token = my_jwt.create_access_token()
    refresh_token = my_jwt.create_refresh_token()

    print("Access Token : ", access_token)
    print("Refresh Token : ", refresh_token)

    # Access Token 검증
    print("Access Token Payload : ", my_jwt.verify_token(access_token))

    # 새로운 Access Token 발급
    new_access_token = my_jwt.refresh(refresh_token)
    print("New Access Token: ", new_access_token)
