from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from util.jwt_token import Jwt

from util.bcrypt import pwd_context
from ... import deps

import crud, schemas
from response_model import BaseResponse
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta, datetime

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = "4ab2fce7a6bd79e1c014396315ed322dd6edb1c5d975c6b74a2904135172c03c"


# 로그인
@router.get("/login", response_model=BaseResponse[schemas.Token])
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(deps.get_db),
):
    user = crud.user.get_user(db=db, username=form_data.username)

    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        # make access token
    payloads = {
        "sub": user.username,
    }
    jwt = Jwt(secret_key=SECRET_KEY)

    result = {
        "username": user.username,
        "access_token": jwt.create_access_token(payloads),
        "refresh_token": jwt.create_refresh_token(payloads),
        "token_type": "bearer",
    }

    return BaseResponse(success=True, result=result)


@router.post("/token/refresh", response_model=BaseResponse[schemas.Token])
def refresh_token(refresh_token: str, db: Session = Depends(deps.get_db)):
    jwt = Jwt(secret_key=SECRET_KEY)
    payload = jwt.verify_token(refresh_token)

    if payload == "토큰 인증 만료" or payload == "토큰 검증 실패":
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = crud.user.get_user(db=db, username=payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    # 새로운 access_token 생성
    new_payloads = {"sub": user.username}
    jwt_new = Jwt(secret_key=SECRET_KEY)

    result = {
        "username": user.username,
        "access_token": jwt_new.create_access_token(new_payloads),
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }

    return BaseResponse(success=True, result=result)
