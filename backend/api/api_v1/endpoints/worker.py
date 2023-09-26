from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse, DataResponse
from ... import deps

import crud, schemas


router = APIRouter()


# 근로자 불러오기
@router.get("/{worker_id}", response_model=DataResponse[schemas.Worker])
def read_worker_with_personal(worker: schemas.Worker = Depends(deps.get_worker)):
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)


# 근로자 불러오기 (개인정보 포함)
@router.get(
    "/{worker_id}/personal",
    response_model=DataResponse[schemas.WorkerWithPersonal],
)
def read_worker_with_personal(worker_id: int, db: Session = Depends(deps.get_db)):
    worker = crud.worker.get_worker_with_personal(db=db, id=worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="해당하는 근로자를 찾을 수 없습니다.")

    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)


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


# 근로자 생성
@router.post("/", response_model=DataResponse[schemas.Worker])
def create_worker(worker_in: schemas.WorkerCreate, db: Session = Depends(deps.get_db)):
    worker = crud.worker.create_worker(db=db, worker_in=worker_in)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)


# 근로자 업데이트
@router.put("/{worker_id}", response_model=BaseResponse)
def update_worker(
    worker_in: schemas.WorkerUpdate,
    db: Session = Depends(deps.get_db),
    worker: schemas.Worker = Depends(deps.get_worker),
):
    crud.worker.update(db=db, db_obj=worker, obj_in=worker_in)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근로자 삭제
@router.delete("/{worker_id}", response_model=BaseResponse)
def delete_worker(
    db: Session = Depends(deps.get_db),
    worker: schemas.Worker = Depends(deps.get_worker),
):
    crud.worker.remove(db=db, id=worker.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")
