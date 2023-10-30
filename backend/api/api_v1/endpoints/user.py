from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import DataResponse, ListResponse, BaseResponse


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# 모든 유저 불러오기
# @router.get("/", response_model=ListResponse[schemas.UserResponse])
# def read_all_user(
#     db: Session = Depends(deps.get_db),
#     skip: int = 0,
#     limit: int = 100,
# ):
#     users = crud.user.get_multi(db, offset=skip, limit=limit)
#     if not users:
#         raise HTTPException(status_code=404, detail="생성된 계정이 없습니다.")

#     return ListResponse(msg="정상 처리되었습니다.", count=len(users), result=users)


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


# 팀 불러오기
@router.get("/{user_id}/team", response_model=DataResponse[schemas.Team])
def read_team_by_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    team = user.team
    if not team:
        raise HTTPException(status_code=404, detail="생성된 팀이 없습니다.")

    return DataResponse(msg="정상 처리되었습니다.", result=team)
