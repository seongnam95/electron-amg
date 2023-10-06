from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse, DataResponse
from ... import deps

from schemas import (
    Employee,
    WorkerCreate,
    WorkerUpdate,
    CoveringWorkerResponse,
    WorkerBaseResponse,
)
import crud, models
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()


def _decrypt_worker(employee: models.Employee):
    return Employee(
        id=employee.id,
        name=employee.name,
        phone=employee.phone,
        ssn=decrypt(employee.ssn_enc),
        gender_code=employee.gender_code,
        bank=employee.bank,
        bank_num=decrypt(employee.bank_num_enc),
        residence=employee.residence,
        bank_book=image_to_base64(employee.bank_book_file_nm),
        id_card=image_to_base64(employee.id_card_file_nm),
        create_date=employee.create_date,
    )


def _covering_worker(employee: models.Employee):
    bank_num_dec = decrypt(employee.bank_num_enc)
    bank_num_cover = (
        bank_num_dec[:4] + "*" * (len(bank_num_dec) - 7) + bank_num_dec[-3:]
    )
    return CoveringWorkerResponse(
        id=employee.id,
        name=employee.name,
        phone=employee.phone,
        bank=employee.bank,
        bank_num_cover=bank_num_cover,
        residence=employee.residence,
        bank_book=image_to_base64(employee.bank_book_file_nm),
        id_card=image_to_base64(employee.id_card_file_nm),
    )


# 근로자 생성
@router.post("/", response_model=DataResponse[WorkerBaseResponse])
def create_worker(worker_in: WorkerCreate, db: Session = Depends(deps.get_db)):
    employee = crud.employee.create_worker(db=db, worker_in=worker_in)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=employee)


# 개인정보로 근로자 불러오기
@router.get("/search/", response_model=DataResponse[CoveringWorkerResponse])
def search_worker(name: str, ssn: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get_worker_search(db=db, name=name, ssn=ssn)
    if not employee:
        raise HTTPException(status_code=404, detail="해당하는 근로자를 찾을 수 없습니다.")
    response = _covering_worker(employee)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=response)


# -----------------------------------------------------------------------------------------
#  관리자 권한
# -----------------------------------------------------------------------------------------


# ID로 근로자 불러오기
@router.get("/{worker_id}", response_model=DataResponse[Employee])
def read_worker(
    # user: User = Depends(deps.get_current_user),
    employee: models.Employee = Depends(deps.get_worker),
):
    worker_dec = _decrypt_worker(employee)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker_dec)


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[Employee])
def read_all_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.employee.get_multi(db, skip=skip, limit=limit)
    workers_dec = [_decrypt_worker(employee) for employee in workers]

    return ListResponse(
        success=True, msg="정상 처리되었습니다.", count=len(workers), result=workers_dec
    )


# 근로자 업데이트
@router.put("/{worker_id}", response_model=DataResponse[WorkerBaseResponse])
def update_worker(
    # user: User = Depends(deps.get_current_user),
    worker_in: WorkerUpdate,
    db: Session = Depends(deps.get_db),
    employee: models.Employee = Depends(deps.get_worker),
):
    employee = crud.employee.update_worker(
        db=db, worker_obj=employee, worker_in=worker_in
    )
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=employee)


# 근로자 삭제
@router.delete("/{worker_id}", response_model=BaseResponse)
def delete_worker(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    employee: models.Employee = Depends(deps.get_worker),
):
    crud.employee.remove_worker(db=db, id=employee.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")
