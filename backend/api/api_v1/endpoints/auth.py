from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from util.jwt_token import Jwt

from util.bcrypt import pwd_context
from ... import deps

from response_model import BaseResponse
from fastapi.security import HTTPBasic

import schemas
import crud

router = APIRouter()
security = HTTPBasic()


class LoginForm(BaseModel):
    username: str
    password: str
    access_ip: str


# 로그인
@router.post("/login")
def login(form_data: LoginForm, db: Session = Depends(deps.get_db)):
    user = crud.user.get_user(db=db, username=form_data.username)

    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="아이디 또는 패스워드가 일치하지 않습니다.",
        )

    jwt = Jwt()
    access_token = jwt.create_access_token({"sub": user.username})
    refresh_token = jwt.create_refresh_token({"sub": user.username})

    base_res = BaseResponse(success=True, result="정상 처리되었습니다.")
    headers = {"Authorization": access_token}

    response = JSONResponse(content=base_res.model_dump(), headers=headers)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        max_age=30 * 24 * 60 * 60,  # 쿠키의 유효기간을 30일로 설정, 필요에 따라 변경 가능
    )

    return response


@router.post("/token/refresh", response_model=BaseResponse[schemas.Token])
def refresh_token(refresh_token: str, db: Session = Depends(deps.get_db)):
    jwt = Jwt()
    payload = jwt.verify_token(refresh_token)

    if not payload.success:
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
    access_token = jwt.create_access_token(new_payloads)

    result = {
        "username": user.username,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }

    return BaseResponse(success=True, result=result)
