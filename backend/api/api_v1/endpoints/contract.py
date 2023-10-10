from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import DataResponse, BaseResponse

router = APIRouter()


# Contract 의존성
def get_contract(db: Session = Depends(deps.get_db), *, contract_id: int):
    contract = crud.contract.get(db=db, id=contract_id)

    if not contract:
        raise HTTPException(status_code=404, detail="존재하지 않는 계약서입니다.")
    return contract


# 계약서 삭제
@router.delete("/{contract_id}", response_model=BaseResponse)
def delete_contract(
    db: Session = Depends(deps.get_db),
    contract: schemas.Contract = Depends(get_contract),
):
    crud.contract.remove(db=db, id=contract.id)
    return BaseResponse(msg="정상 처리되었습니다.")


# 해당 근로자 계약서 생성
@router.post("/employee/{employee_id}", response_model=BaseResponse)
def create_contract(
    db: Session = Depends(deps.get_db),
    *,
    employee: schemas.Employee = Depends(deps.get_employee),
    contract_in: schemas.ContractCreate,
):
    crud.contract.create_contract(
        db=db,
        employee_id=employee.id,
        contract_obj=contract_in,
    )
    return BaseResponse(msg="정상 처리되었습니다.")


# 해당 근로자 전체 계약서 불러오기
@router.get(
    "/employee/{employee_id}",
    response_model=DataResponse[schemas.EmployeeContractModel],
)
def read_all_contract_for_employee(
    employee: schemas.Employee = Depends(deps.get_employee),
    db: Session = Depends(deps.get_db),
):
    contracts = crud.contract.get_employee_contract(db=db, employee_id=employee.id)

    return DataResponse(msg="정상 처리되었습니다.", result=contracts)
