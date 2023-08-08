from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse
from ... import deps

import crud, schemas


router = APIRouter()


# 근로자 불러오기
@router.get("/{worker_id}", response_model=BaseResponse[schemas.Worker])
def read_worker(
    worker: schemas.Worker = Depends(deps.get_worker),
):
    return BaseResponse(success=True, result=worker)


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[schemas.Worker])
def read_all_worker(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.worker.get_multi(db, skip=skip, limit=limit)

    if not workers:
        raise HTTPException(status_code=404, detail="근로자가 없습니다.")

    return ListResponse(success=True, count=len(workers), result=workers)


# 근로자 생성
@router.post("/", response_model=BaseResponse[schemas.Worker])
def create_worker(
    *, db: Session = Depends(deps.get_db), worker_in: schemas.WorkerCreate
):
    worker = crud.worker.create(db=db, obj_in=worker_in)
    return BaseResponse(success=True, result=worker)


# 근로자 데이터 업데이트
@router.put("/{worker_id}", response_model=BaseResponse[schemas.Worker])
def update_worker(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    worker_in: schemas.WorkerUpdate,
):
    worker = crud.worker.update(db=db, db_obj=worker, obj_in=worker_in)
    return BaseResponse(success=True, result=worker)


# 근로자 삭제
@router.delete("/{worker_id}", response_model=BaseResponse[schemas.Worker])
def delete_worker(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    worker = crud.worker.remove(db=db, id=worker.id)
    return BaseResponse(success=True, result=worker)
