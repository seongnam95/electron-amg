from fastapi import HTTPException, Depends, Header
from sqlalchemy.orm import Session
from typing import Any, Generator, List
from response_model import ListData
from exceptions import TokenExpiredError, TokenInvalidError

from db.session import SessionLocal
import crud, models
from util.jwt_token import Jwt


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> models.User:
    # Authorization Header에 Access-Token이 있는지 확인
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="MISSING_TOKEN")

    token = authorization.split("Bearer ")[1].strip()

    try:
        # Access-Token 검증
        jwt = Jwt()
        payload = jwt.verify_token(token=token)

        user = crud.user.get_user(db=db, username=payload.get("sub"))

        # 계정 사용 권한 체크
        if not user.is_approved:
            raise HTTPException(status_code=403, detail="사용이 제한된 계정입니다.")

        return user

    except (TokenExpiredError, TokenInvalidError) as e:
        raise HTTPException(status_code=401, detail=str(e))


def ensure_admin(user: models.User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="권한이 없습니다.")
    return user


def create_list_response(data: List[Any], total: int, page: int, limit: int):
    offset = (page - 1) * limit
    next_page = page + 1 if (offset + limit) < total else page
    has_more = (offset + limit) < total

    return ListData(
        total=total,
        page=page,
        next_page=next_page,
        has_more=has_more,
        count=len(data),
        offset=offset,
        list=data,
    )
