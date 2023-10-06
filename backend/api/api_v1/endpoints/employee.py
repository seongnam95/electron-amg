from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from response_model import BaseResponse, ListResponse, DataResponse
from ... import deps

from schemas import (
    Employee,
    EmployeeCreate,
    EmployeeUpdate,
    CoveringEmployeeResponse,
    EmployeeBaseResponse,
)
import crud, models
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()


def _decrypt_employee(employee: models.Employee):
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


def _covering_employee(employee: models.Employee):
    bank_num_dec = decrypt(employee.bank_num_enc)
    bank_num_cover = (
        bank_num_dec[:4] + "*" * (len(bank_num_dec) - 7) + bank_num_dec[-3:]
    )
    return CoveringEmployeeResponse(
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
@router.post("/", response_model=DataResponse[EmployeeBaseResponse])
def create_employee(employee_in: EmployeeCreate, db: Session = Depends(deps.get_db)):
    employee = crud.employee.create_employee(db=db, employee_in=employee_in)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=employee)


# 개인정보로 근로자 불러오기
@router.get("/search/", response_model=DataResponse[CoveringEmployeeResponse])
def search_employee(name: str, ssn: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get_employee_search(db=db, name=name, ssn=ssn)
    if not employee:
        raise HTTPException(status_code=404, detail="해당하는 근로자를 찾을 수 없습니다.")
    response = _covering_employee(employee)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=response)


# -----------------------------------------------------------------------------------------
#  관리자 권한
# -----------------------------------------------------------------------------------------


# ID로 근로자 불러오기
@router.get("/{employee_id}", response_model=DataResponse[Employee])
def read_employee(
    # user: User = Depends(deps.get_current_user),
    employee: models.Employee = Depends(deps.get_employee),
):
    employee_dec = _decrypt_employee(employee)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=employee_dec)


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[Employee])
def read_all_employee(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    employees = crud.employee.get_multi(db, skip=skip, limit=limit)
    employees_dec = [_decrypt_employee(employee) for employee in employees]

    return ListResponse(
        success=True, msg="정상 처리되었습니다.", count=len(employees), result=employees_dec
    )


# 근로자 업데이트
@router.put("/{employee_id}", response_model=DataResponse[EmployeeBaseResponse])
def update_employee(
    # user: User = Depends(deps.get_current_user),
    employee_in: EmployeeUpdate,
    db: Session = Depends(deps.get_db),
    employee: models.Employee = Depends(deps.get_employee),
):
    employee = crud.employee.update_employee(
        db=db, employee_obj=employee, employee_in=employee_in
    )
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=employee)


# 근로자 삭제
@router.delete("/{employee_id}", response_model=BaseResponse)
def delete_employee(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    employee: models.Employee = Depends(deps.get_employee),
):
    crud.employee.remove_employee(db=db, id=employee.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")
