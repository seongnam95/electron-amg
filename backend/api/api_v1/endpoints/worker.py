from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse, DataResponse
from ... import deps

from schemas import (
    Worker,
    WorkerCreate,
    WorkerUpdate,
    CoveringWorkerResponse,
    WorkerBaseResponse,
)
import crud, models
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()


def _decrypt_worker(worker: models.Worker):
    return Worker(
        id=worker.id,
        name=worker.name,
        phone=worker.phone,
        ssn=decrypt(worker.ssn_enc),
        gender_code=worker.gender_code,
        bank=worker.bank,
        bank_num=decrypt(worker.bank_num_enc),
        residence=worker.residence,
        bank_book=image_to_base64(worker.bank_book_file_nm),
        id_card=image_to_base64(worker.id_card_file_nm),
        create_date=worker.create_date,
    )


def _covering_worker(worker: models.Worker):
    bank_num_dec = decrypt(worker.bank_num_enc)
    bank_num_cover = (
        bank_num_dec[:4] + "*" * (len(bank_num_dec) - 7) + bank_num_dec[-3:]
    )
    return CoveringWorkerResponse(
        id=worker.id,
        name=worker.name,
        phone=worker.phone,
        bank=worker.bank,
        bank_num_cover=bank_num_cover,
        residence=worker.residence,
        bank_book=image_to_base64(worker.bank_book_file_nm),
        id_card=image_to_base64(worker.id_card_file_nm),
    )


# 근로자 생성
@router.post("/", response_model=DataResponse[WorkerBaseResponse])
def create_worker(worker_in: WorkerCreate, db: Session = Depends(deps.get_db)):
    worker = crud.worker.create_worker(db=db, worker_in=worker_in)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)


# 개인정보로 근로자 불러오기
@router.get("/search/", response_model=DataResponse[CoveringWorkerResponse])
def read_worker_with_personal(name: str, ssn: str, db: Session = Depends(deps.get_db)):
    worker = crud.worker.get_worker_search(db=db, name=name, ssn=ssn)
    if not worker:
        raise HTTPException(status_code=404, detail="해당하는 근로자를 찾을 수 없습니다.")
    response = _covering_worker(worker)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=response)


# -----------------------------------------------------------------------------------------
#  관리자 권한
# -----------------------------------------------------------------------------------------


# ID로 근로자 불러오기
@router.get("/{worker_id}", response_model=DataResponse[Worker])
def read_worker_with_personal(
    # user: User = Depends(deps.get_current_user),
    worker: models.Worker = Depends(deps.get_worker),
):
    worker_dec = _decrypt_worker(worker)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker_dec)


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[Worker])
def read_all_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.worker.get_multi(db, skip=skip, limit=limit)
    workers_dec = [_decrypt_worker(worker) for worker in workers]

    return ListResponse(
        success=True, msg="정상 처리되었습니다.", count=len(workers), result=workers_dec
    )


# 근로자 업데이트
@router.put("/{worker_id}", response_model=BaseResponse)
def update_worker(
    # user: User = Depends(deps.get_current_user),
    worker_in: WorkerUpdate,
    db: Session = Depends(deps.get_db),
    worker: models.Worker = Depends(deps.get_worker),
):
    crud.worker.update_worker(db=db, worker_obj=worker, worker_in=worker_in)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근로자 삭제
@router.delete("/{worker_id}", response_model=BaseResponse)
def delete_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    worker: models.Worker = Depends(deps.get_worker),
):
    crud.worker.remove(db=db, id=worker.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")
