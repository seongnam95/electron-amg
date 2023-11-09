from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.employee import EmployeeCoveringResponse, EmployeeResponse
from response_model import BaseResponse, DataResponse, ListResponse
from ... import deps


import crud, models, schemas
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()


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


# GET : ID로 근로자 불러오기
@router.get(
    "/employee/{employee_id}",
    response_model=DataResponse[schemas.EmployeeDetailResponse],
)
def read_employee(employee_id: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    employee_dec = _decrypt_employee(employee)
    return DataResponse(msg="정상 처리되었습니다.", result=employee_dec)


# GET : 팀 소속 전체 근로자 불러오기
@router.get("/team/{team_id}/employee", response_model=ListResponse[EmployeeResponse])
def read_multi_employee(
    # user: User = Depends(deps.get_current_user),
    team_id: str,
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="해당 팀을 찾을 수 없습니다.")

    response = deps.create_list_response(
        data=team.employees, total=len(team.employees), limit=limit, page=page
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
#  의존성 데이터 엔드포인트
# -----------------------------------------------------------------------------------------


# 근무로그 생성 (날짜 중복 불가)
@router.post("/employee/{employee_id}/attendance", response_model=BaseResponse)
def create_attendance(
    employee_id: str,
    attendance_in: schemas.AttendanceCreate,
    db: Session = Depends(deps.get_db),
):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    crud.attendance.create_attendance(
        db=db, attendance_in=attendance_in, employee_id=employee.id
    )

    return BaseResponse(msg="정상 처리되었습니다.")


# -----------------------------------------------------------------------------------------
#  암호화, 커버링 함수
# -----------------------------------------------------------------------------------------


# 암호화
def _decrypt_employee(employee: models.Employee):
    return schemas.EmployeeDetailResponse(
        id=employee.id,
        name=employee.name,
        phone=employee.phone,
        ssn=decrypt(employee.ssn_enc),
        bank=employee.bank,
        bank_num=decrypt(employee.bank_num_enc),
        address=employee.address,
        bank_book=image_to_base64(employee.bank_book_file_nm),
        id_card=image_to_base64(employee.id_card_file_nm),
        create_date=employee.create_date,
        sign_base64=employee.sign_base64,
        start_period=employee.start_period,
        end_period=employee.end_period,
        position_id=employee.position_id,
        position=employee.position,
        team=employee.team,
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
