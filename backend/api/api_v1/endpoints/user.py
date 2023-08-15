from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import BaseResponse, ListResponse


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_user(user_id: int, db: Session = Depends(deps.get_db)) -> schemas.User:
    user = crud.user.get(db=db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="해당하는 유저를 찾을 수 없습니다.")
    return user


# 모든 유저 불러오기
@router.get("/", response_model=ListResponse[schemas.UserResponse])
def read_all_user(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    if not users:
        raise HTTPException(status_code=404, detail="생성된 계정이 없습니다.")

    return ListResponse(success=True, count=len(users), result=users)


# 유저 불러오기
@router.get("/{user_id}", response_model=BaseResponse[schemas.UserResponse])
def read_user(
    user: schemas.User = Depends(get_user),
):
    return BaseResponse(success=True, result=user)


# 유저 불러오기
@router.get("/current", response_model=BaseResponse[schemas.UserResponse])
def get_current_user(
    db: Session = Depends(deps.get_db), *, token: str = Depends(oauth2_scheme)
):
    print(token)


# 유저 생성
@router.post("/", response_model=BaseResponse[schemas.UserResponse])
def create_user(db: Session = Depends(deps.get_db), *, user_in: schemas.UserCreate):
    user = crud.user.create_user(db=db, obj_in=user_in)
    return BaseResponse(success=True, result=user)


# 유저 업데이트
@router.put("/{user_id}", response_model=BaseResponse[schemas.UserResponse])
def update_user(
    db: Session = Depends(deps.get_db),
    *,
    user: schemas.User = Depends(get_user),
    user_in: schemas.UserUpdate,
):
    user = crud.user.update(db=db, db_obj=user, obj_in=user_in)
    return BaseResponse(success=True, result=user)


# 유저 삭제
@router.delete("/{user_id}", response_model=BaseResponse[schemas.UserResponse])
def delete_user(
    db: Session = Depends(deps.get_db),
    *,
    user: schemas.User = Depends(get_user),
):
    user = crud.user.remove(db=db, id=user.id)
    return BaseResponse(success=True, result=user)
