from fastapi import Cookie, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from typing import Generator
from exceptions import TokenExpiredError, TokenInvalidError

from db.session import SessionLocal
import crud, schemas, models
from util.jwt_token import Jwt


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_worker(worker_id: int, db: Session = Depends(get_db)) -> models.Worker:
    worker = crud.worker.get(db=db, id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="해당하는 근로자를 찾을 수 없습니다.")
    return worker


def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> models.User:
    # Authorization Header에 Access-Token이 있는지 확인
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split("Bearer ")[1].strip()

    try:
        # Access-Token 검증
        jwt = Jwt()
        payload = jwt.verify_token(token=token)

        user = crud.user.get_user(db=db, username=payload.get("sub"))

        # 계정 사용 권한 체크
        if not user.is_approved:
            raise HTTPException(status_code=401, detail="사용이 제한된 계정입니다.")

        return user

    except (TokenExpiredError, TokenInvalidError) as e:
        raise HTTPException(status_code=401, detail=str(e))


def ensure_admin(user: models.User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    return user
