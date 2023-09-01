from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse
from ... import deps

import crud, schemas


router = APIRouter()


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[schemas.Worker])
def read_all_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.worker.get_multi(db, skip=skip, limit=limit)
    return ListResponse(
        success=True, msg="정상 처리되었습니다.", count=len(workers), result=workers
    )


@router.get("/un/", response_model=ListResponse[schemas.Worker])
def read_all_unaffiliated_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.worker.get_unaffiliated_worker(db, skip=skip, limit=limit)
    return ListResponse(
        success=True, msg="정상 처리되었습니다.", count=len(workers), result=workers
    )


# 근로자 생성
@router.post("/", response_model=BaseResponse)
def create_worker(
    *, db: Session = Depends(deps.get_db), worker_in: schemas.WorkerCreate
):
    crud.worker.create_worker_in_group(db=db, obj_in=worker_in)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근로자 업데이트
@router.put("/{worker_id}", response_model=BaseResponse)
def update_worker(
    *,
    db: Session = Depends(deps.get_db),
    worker: schemas.Worker = Depends(deps.get_worker),
    worker_in: schemas.WorkerUpdate,
):
    crud.worker.update(db=db, db_obj=worker, obj_in=worker_in)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근로자 삭제
@router.delete("/{worker_id}", response_model=BaseResponse)
def delete_worker(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    crud.worker.remove(db=db, id=worker.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근로자 불러오기
# @router.get("/{worker_id}", response_model=DataResponse[schemas.Worker])
# def read_worker(
#     worker: schemas.Worker = Depends(deps.get_worker),
# ):
#     return DataResponse(success=True, result=worker)


# 근로자의 모든 계약서 불러오기
# @router.get("/{worker_id}/contract", response_model=ListResponse[schemas.Contract])
# def read_all_contract(
#     worker: schemas.Worker = Depends(deps.get_worker),
#     db: Session = Depends(deps.get_db),
# ):
#     contracts = crud.worker.get_worker_child_all(
#         db=db, worker_id=worker.id, model=models.Contract
#     )
#     print(contracts)
#     return ListResponse(success=True, count=len(contracts), result=contracts)


# 근로자의 모든 근무일지 불러오기
# @router.get("/{worker_id}/worklog", response_model=ListResponse[schemas.WorkLog])
# def read_all_worklog(
#     db: Session = Depends(deps.get_db),
#     worker: schemas.Worker = Depends(deps.get_worker),
# ):
#     worklogs = crud.worker.get_worker_child_all(
#         db=db, worker_id=worker.id, model=models.WorkLog
#     )
#     return ListResponse(success=True, count=len(worklogs), result=worklogs)
