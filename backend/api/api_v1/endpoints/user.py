from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import BaseResponse


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# 유저 생성
@router.post("/", response_model=BaseResponse)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(deps.get_db)):
    crud.user.create_user(db=db, obj_in=user_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 유저 업데이트
@router.put("/{user_id}", response_model=BaseResponse)
def update_user(
    user_id: int,
    user_in: schemas.UserUpdate,
    db: Session = Depends(deps.get_db),
):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    crud.user.update(db=db, db_obj=user, obj_in=user_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 유저 삭제
@router.delete("/{user_id}", response_model=BaseResponse)
def delete_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    crud.user.remove(db=db, id=user.id)
    return BaseResponse(msg="정상 처리되었습니다.")


# 팀 생성 (유저)
@router.post("/{user_id}/team", response_model=BaseResponse)
def create_team(
    user_id: int, team_in: schemas.TeamCreate, db: Session = Depends(deps.get_db)
):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    crud.team.create_team_for_user(db=db, obj_in=team_in, user_id=user_id)
    return BaseResponse(msg="정상 처리되었습니다.")
