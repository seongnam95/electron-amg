from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse
from ... import deps

import crud, schemas


router = APIRouter()


def get_group(group_id: int, db: Session = Depends(deps.get_db)) -> schemas.group:
    group = crud.group.get(db=db, id=group_id)
    if not group:
        raise HTTPException(status_code=404, detail="해당하는 그룹을 찾을 수 없습니다.")
    return group


# 전체 그룹 불러오기
@router.get("/", response_model=ListResponse[schemas.Group])
def read_all_group(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    groups = crud.group.get_multi(db, skip=skip, limit=limit)

    if not groups:
        raise HTTPException(status_code=404, detail="그룹이 없습니다.")

    return ListResponse(success=True, count=len(groups), result=groups)


# 그룹 불러오기
@router.get("/{group_id}", response_model=BaseResponse[schemas.Group])
def read_group(
    group: schemas.Group = Depends(get_group),
):
    return BaseResponse(success=True, result=group)


# 그룹의 모든 근로자 불러오기
@router.get("/{group_id}/worker", response_model=ListResponse[schemas.Worker])
def read_group(
    group: schemas.Group = Depends(get_group), db: Session = Depends(deps.get_db)
):
    workers = crud.group.get_group_workers(db=db, group_id=group.id)
    return ListResponse(success=True, count=len(workers), result=workers)


# 그룹 생성
@router.post("/", response_model=BaseResponse[schemas.Group])
def create_group(*, db: Session = Depends(deps.get_db), group_in: schemas.GroupCreate):
    group = crud.group.create(db=db, obj_in=group_in)
    return BaseResponse(success=True, result=group)


# 그룹 업데이트
@router.put("/{group_id}", response_model=BaseResponse[schemas.Group])
def update_group(
    *,
    group: schemas.Group = Depends(get_group),
    db: Session = Depends(deps.get_db),
    group_in: schemas.GroupUpdate,
):
    group = crud.group.update(db=db, db_obj=group, obj_in=group_in)
    return BaseResponse(success=True, result=group)


# 그룹 삭제
@router.delete("/{group_id}", response_model=BaseResponse[schemas.Group])
def delete_group(
    *,
    group: schemas.Group = Depends(get_group),
    db: Session = Depends(deps.get_db),
):
    group = crud.group.remove(db=db, id=group.id)
    return BaseResponse(success=True, result=group)
