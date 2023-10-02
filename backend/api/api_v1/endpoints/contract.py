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
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 해당 근로자 계약서 생성
@router.post("/worker/{worker_id}", response_model=BaseResponse)
def create_contract(
    db: Session = Depends(deps.get_db),
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    contract_in: schemas.ContractCreate,
):
    crud.contract.create_contract(
        db=db,
        worker_id=worker.id,
        contract_obj=contract_in,
    )
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 해당 근로자 전체 계약서 불러오기
@router.get(
    "/worker/{worker_id}",
    response_model=DataResponse[schemas.WorkerContractModel],
)
def read_all_contract_for_worker(
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    contracts = crud.contract.get_multi_for_worker(db=db, worker_id=worker.id)
    if not contracts:
        raise HTTPException(status_code=404, detail="작성 된 계약서가 없습니다.")

    valid_contract = None
    prev_contracts = []
    for contract in contracts:
        if contract.valid:
            valid_contract = contract
        else:
            prev_contracts.append(contract)

    response = schemas.WorkerContractModel(
        valid_contract=valid_contract,
        prev_contract_count=len(prev_contracts),
        prev_contracts=prev_contracts,
    )

    return DataResponse(success=True, msg="정상 처리되었습니다.", result=response)
