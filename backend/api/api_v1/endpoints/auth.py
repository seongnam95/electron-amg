from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse


router = APIRouter()


# 로그인
@router.get("/", response_model=BaseResponse[schemas.Personal])
def login(
    *,
    user_in: schemas.UserLogin = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    user = crud.user.verify_user(db=db, username=user_in.username)

    if not user:
        raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")

    return BaseResponse(success=True, result=user)
