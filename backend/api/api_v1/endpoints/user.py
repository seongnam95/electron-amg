from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse


router = APIRouter()


def get_user(user_id: int, db: Session = Depends(deps.get_db)) -> schemas.user:
    user = crud.user.get(db=db, id=user_id)

    if not user:
        raise HTTPException(status_code=404, detail="해당하는 유저를 찾을 수 없습니다.")

    return user


# 유저 불러오기
@router.get("/", response_model=BaseResponse[schemas.User])
def read_user(
    user: schemas.User = Depends(get_user),
):
    return user


# 근로자 생성
@router.post("/", response_model=BaseResponse[schemas.User])
def create_user(*, db: Session = Depends(deps.get_db), user_in: schemas.UserCreate):
    user = crud.user.create_user(db=db, obj_in=user_in)
    return BaseResponse(success=True, result=user)
