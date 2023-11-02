from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.employee import EmployeeCoveringResponse, EmployeeResponse
from response_model import BaseResponse, DataResponse, ListResponse
from ... import deps


import crud, models, schemas
from util.crypto import decrypt
from util.image_converter import image_to_base64


router = APIRouter()


# 근로자 생성
@router.post("/", response_model=BaseResponse)
def create_employee(
    employee_in: schemas.EmployeeCreate, db: Session = Depends(deps.get_db)
):
    print(employee_in)
    crud.employee.create_employee(db=db, employee_in=employee_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 개인정보로 근로자 불러오기
@router.get("/search/", response_model=DataResponse[EmployeeCoveringResponse])
def search_employee(name: str, ssn: str, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get_employee_search(db=db, name=name, ssn=ssn)
    if not employee:
        return DataResponse(msg="해당하는 근로자를 찾을 수 없습니다.", result=None)

    response = _covering_employee(employee)
    return DataResponse(msg="정상 처리되었습니다.", result=response)


# -----------------------------------------------------------------------------------------
#  관리자 권한
# -----------------------------------------------------------------------------------------


# ID로 근로자 불러오기
@router.get("/{employee_id}", response_model=DataResponse[schemas.Employee])
def read_employee(employee_id: int, db: Session = Depends(deps.get_db)):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    employee_dec = _decrypt_employee(employee)
    return DataResponse(msg="정상 처리되었습니다.", result=employee_dec)


# 전체 근로자 불러오기
@router.get("/", response_model=ListResponse[EmployeeResponse])
def read_multi_employee(
    # user: User = Depends(deps.get_current_user),
    db: Session = Depends(deps.get_db),
    valid: bool = True,
    page: int = 1,
    limit: int = 20,
):
    offset = (page - 1) * limit
    total = crud.employee.get_count(db)
    employees = crud.employee.get_multi_employee(
        db, valid=valid, offset=offset, limit=limit
    )

    response = deps.create_list_response(
        data=employees, total=total, limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 근로자 업데이트
@router.put("/{employee_id}", response_model=DataResponse[schemas.EmployeeResponse])
def update_employee(
    employee_id: int,
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


# 근로자 다중 삭제
@router.delete("/", response_model=BaseResponse)
def delete_employee(
    # user: User = Depends(deps.get_current_user),
    employee_ids: schemas.MultipleIdBody,
    db: Session = Depends(deps.get_db),
):
    crud.employee.remove_multi_employee(db=db, ids_in=employee_ids)
    return BaseResponse(msg="정상 처리되었습니다.")


# -----------------------------------------------------------------------------------------
#  의존성 데이터 엔드포인트
# -----------------------------------------------------------------------------------------


# 근무로그 생성 (날짜 중복 불가)
@router.post("/{employee_id}/attendance", response_model=BaseResponse)
def create_attendance(
    employee_id: int,
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
    return schemas.Employee(
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
