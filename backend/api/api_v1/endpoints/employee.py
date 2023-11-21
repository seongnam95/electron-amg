from typing import Any, List, Optional, TypeVar, Union
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from schemas.employee import (
    EmployeeCoveringResponse,
    EmployeeResponse,
    EncryptEmployee,
    EmployeeDocumentResponse,
)
from response_model import BaseResponse, DataResponse, ListResponse
from ... import deps


import crud, models, schemas
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()

SchemaType = TypeVar("SchemaType", bound=BaseModel)


# 개인정보로 근로자 불러오기
@router.get("/employee/search/", response_model=DataResponse[EmployeeCoveringResponse])
def search_employee(name: str, ssn: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get_employee_search(db=db, name=name, ssn=ssn)
    if not employee:
        return DataResponse(msg="해당하는 근로자를 찾을 수 없습니다.", result=None)

    response = _covering_employee(employee)
    return DataResponse(msg="정상 처리되었습니다.", result=response)


# -----------------------------------------------------------------------------------------
#  관리자 권한
# -----------------------------------------------------------------------------------------


# GET : 근로자 [신분증, 통장사본, 서명] 불러오기
@router.get(
    "/employee/{employee_id}/document",
    response_model=DataResponse[EmployeeDocumentResponse],
)
def read_employee(employee_id: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    employee_dec = _decrypt_employees(employee, EmployeeDocumentResponse)
    return DataResponse(msg="정상 처리되었습니다.", result=employee_dec)


# GET : 팀 소속 전체 근로자 불러오기
@router.get("/team/{team_id}/employee", response_model=ListResponse[EmployeeResponse])
def read_multi_employee(
    team_id: str,
    valid: Optional[bool] = None,
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="해당 팀을 찾을 수 없습니다.")

    offset = (page - 1) * limit
    employees = crud.employee.get_multi_employee(
        db=db, limit=limit, offset=offset, team_id=team_id, valid=valid
    )

    employees_enc = _decrypt_employees(employees, EmployeeResponse)

    response = deps.create_list_response(
        data=employees_enc,
        total=len(employees_enc),
        limit=limit,
        page=page,
    )

    return ListResponse(msg="정상 처리되었습니다.", result=response)


# PUT : 근로자 업데이트
@router.put(
    "/employee/{employee_id}", response_model=DataResponse[schemas.EmployeeResponse]
)
def update_employee(
    employee_id: str,
    employee_in: schemas.EmployeeUpdate,
    db: Session = Depends(deps.get_db),
):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    employee = crud.employee.update_employee(
        db=db, employee_obj=employee, employee_in=employee_in
    )
    return DataResponse(msg="정상 처리되었습니다.", result=employee)


# REMOVE : 근로자 삭제
@router.delete("/employee/{employee_id}", response_model=BaseResponse)
def delete_employee(
    # user: User = Depends(deps.get_current_user),
    employee_id: str,
    db: Session = Depends(deps.get_db),
):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    crud.employee.remove_employee(db=db, employee_obj=employee)
    return BaseResponse(msg="정상 처리되었습니다.")


# -----------------------------------------------------------------------------------------
#  암호화, 커버링 함수
# -----------------------------------------------------------------------------------------


def _decrypt_employees(
    employees: Union[models.Employee, List[models.Employee]], schema: SchemaType
):
    isList = isinstance(employees, list)

    employees = employees if isList else [employees]

    employee_dicts = [
        EncryptEmployee.model_validate(employee).model_dump() for employee in employees
    ]

    transform_functions = {
        "ssn_enc": decrypt,
        "bank_num_enc": decrypt,
        "bank_book_file_nm": image_to_base64,
        "id_card_file_nm": image_to_base64,
    }

    key_transforms = {
        "ssn_enc": "ssn",
        "bank_num_enc": "bank_num",
        "bank_book_file_nm": "bank_book",
        "id_card_file_nm": "id_card",
    }

    response_fields = set(schema.model_fields.keys())

    transformed_data = [
        {
            key_transforms.get(k, k): transform_functions.get(k, lambda x: x)(v)
            for k, v in d.items()
            if k in response_fields or key_transforms.get(k, k) in response_fields
        }
        for d in employee_dicts
    ]

    return (
        [schema(**data) for data in transformed_data]
        if isList
        else schema(**transformed_data[0])
    )


# 복호화, 커버링
def _covering_employee(employee: models.Employee):
    bank_num_dec = decrypt(employee.bank_num_enc)
    bank_num_cover = (
        bank_num_dec[:4] + "*" * (len(bank_num_dec) - 7) + bank_num_dec[-3:]
    )
    return schemas.EmployeeCoveringResponse(
        id=employee.id,
        name=employee.name,
        phone=employee.phone,
        bank=employee.bank,
        bank_num_cover=bank_num_cover,
        address=employee.address,
        bank_book=image_to_base64(employee.bank_book_file_nm),
        id_card=image_to_base64(employee.id_card_file_nm),
    )
