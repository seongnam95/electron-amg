from passlib.context import CryptContext

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(*, password: str):
    return bcrypt_context.hash(password)
