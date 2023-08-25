from fastapi import APIRouter, HTTPException, Cookie, Depends
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic

from pydantic import BaseModel
from sqlalchemy.orm import Session

from ... import deps

from response_model import BaseResponse
from exceptions import TokenExpiredError, TokenInvalidError

from util.jwt_token import Jwt
from util.bcrypt import pwd_context
from fastapi.encoders import jsonable_encoder

import crud, schemas

router = APIRouter()
security = HTTPBasic()


class LoginForm(BaseModel):
    username: str
    password: str
    access_ip: str


# 로그인 / Token 발급
@router.post("/login")
def login(form_data: LoginForm, db: Session = Depends(deps.get_db)):
    user = crud.user.get_user(db=db, username=form_data.username)

    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="아이디 또는 패스워드가 일치하지 않습니다.",
        )

    user_json = jsonable_encoder(schemas.UserResponse.from_orm(user))

    jwt = Jwt()
    access_token = jwt.create_access_token({"sub": user.username})
    refresh_token = jwt.create_refresh_token({"sub": user.username})

    headers = {"Authorization": access_token}

    response = JSONResponse(content=user_json, headers=headers)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        max_age=1 * 24 * 60 * 60,  # 초 단위 [ 설정 값 : 1일 ]
    )

    return response


# Token 재발급
@router.post("/token/refresh")
def refresh_token(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="MISSING_REFRESH_TOKEN")

    jwt = Jwt()

    try:
        payload = jwt.verify_token(token=refresh_token)

    except (TokenExpiredError, TokenInvalidError):
        raise HTTPException(status_code=401, detail="EXPIRED_REFRESH_TOKEN")

    username = payload.get("sub")
    new_access_token = jwt.create_access_token({"sub": username})

    base_res = BaseResponse(success=True, result="정상 처리되었습니다.")
    headers = {"Authorization": new_access_token}

    return JSONResponse(content=base_res.model_dump(), headers=headers)
