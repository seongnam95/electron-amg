from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse
from ... import deps

import crud, schemas
from models import User


router = APIRouter()


def get_group(group_id: int, db: Session = Depends(deps.get_db)) -> schemas.group:
    group = crud.group.get(db=db, id=group_id)
    if not group:
        raise HTTPException(status_code=404, detail="해당하는 그룹을 찾을 수 없습니다.")
    return group


# 그룹 다중 불러오기
@router.get("/", response_model=ListResponse[schemas.Group])
def read_groups(
    user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    if user.is_admin:
        groups = crud.group.get_multi(db, skip=skip, limit=limit)
    else:
        groups = crud.group.get_multi_by_user(
            db, user_id=user.id, skip=skip, limit=limit
        )

    # if not groups:
    #     raise HTTPException(status_code=404, detail="그룹이 없습니다.")

    return ListResponse(success=True, count=len(groups), result=groups)


# 그룹 생성
@router.post("/", response_model=BaseResponse[schemas.Group])
def create_group(
    *,
    is_admin: User = Depends(deps.ensure_admin),
    db: Session = Depends(deps.get_db),
    group_in: schemas.GroupCreate,
):
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


# 그룹 계약서 생성
@router.post("/{group_id}/contract", response_model=BaseResponse[schemas.Contract])
def create_contract_for_worker(
    *,
    db: Session = Depends(deps.get_db),
    group: schemas.Group = Depends(get_group),
    obj_in: schemas.WorkerContractCreateModel,
):
    worker_in = obj_in.worker
    contract_in = obj_in.contract

    # Worker 검색 후, 없다면 새로 생성
    worker = crud.worker.search(db=db, name=worker_in.name, phone=worker_in.phone)
    if not worker:
        worker_in = worker_in.model_dump()
        worker_in["group_id"] = group.id

        worker = crud.worker.create(db=db, obj_in=worker_in)

    # Contract 생성
    contract_in = contract_in.model_dump()
    contract_in["company_name"] = group.name

    contract = crud.contract.create_contract(
        db=db, obj_in=contract_in, worker_id=worker.id
    )

    return BaseResponse(success=True, result=contract)
