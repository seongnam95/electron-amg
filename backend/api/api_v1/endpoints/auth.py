from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from util.bcrypt import pwd_context
from ... import deps

from models import AuthSession
import crud
from response_model import BaseResponse
from fastapi.security import HTTPBasic
from starlette.requests import Request
import uuid

router = APIRouter()
security = HTTPBasic()


class LoginForm(BaseModel):
    username: str
    password: str
    access_ip: str


# 로그인
@router.post("/login", response_model=BaseResponse[str])
def login(form_data: LoginForm, request: Request, db: Session = Depends(deps.get_db)):
    user = crud.user.get_user(db=db, username=form_data.username)

    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
        )

    # 고유한 세션 식별자 생성
    session_id = str(uuid.uuid4())
    request.session["session_id"] = session_id

    # 데이터베이스에 세션 정보 저장
    db_session = AuthSession(
        session_id=session_id, last_access_ip=form_data.access_ip, user_id=user.id
    )
    db.add(db_session)
    db.commit()

    return BaseResponse(success=True, result="정상 처리되었습니다.")


# 로그인
@router.get("/test", response_model=BaseResponse[str])
def login(request: Request, db: Session = Depends(deps.get_db)):
    session_id = request.session.get("session_id")
    print(session_id)

    return BaseResponse(success=True, result="정상 처리되었습니다.")


# @router.post("/token/refresh", response_model=BaseResponse[schemas.Token])
# def refresh_token(refresh_token: str, db: Session = Depends(deps.get_db)):
#     jwt = Jwt(secret_key=SECRET_KEY)
#     payload = jwt.verify_token(refresh_token)

#     if payload == "토큰 인증 만료" or payload == "토큰 검증 실패":
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid or expired refresh token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )

#     user = crud.user.get_user(db=db, username=payload["sub"])
#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")

#     # 새로운 access_token 생성
#     new_payloads = {"sub": user.username}
#     jwt_new = Jwt(secret_key=SECRET_KEY)

#     result = {
#         "username": user.username,
#         "access_token": jwt_new.create_access_token(new_payloads),
#         "refresh_token": refresh_token,
#         "token_type": "bearer",
#     }

#     return BaseResponse(success=True, result=result)
