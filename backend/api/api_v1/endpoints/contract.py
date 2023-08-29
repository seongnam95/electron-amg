from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import DataResponse, ListResponse

router = APIRouter()


def get_contract(*, contract_id: int, db: Session = Depends(deps.get_db)):
    contract = crud.contract.get(db=db, id=contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="존재하지 않는 계약서입니다.")
    return contract


# TODO : 추후 필요 없다면 삭제
# 전체 계약서 불러오기
@router.get("/", response_model=ListResponse[schemas.Contract])
def read_all_contract(
    *,
    db: Session = Depends(deps.get_db),
):
    contracts = crud.contract.get_multi(db=db)
    return ListResponse(success=True, count=len(contracts), result=contracts)


# TODO : 추후 필요 없다면 삭제
# 계약서 불러오기
@router.get("/{contract_id}", response_model=DataResponse[schemas.Contract])
def read_contract(
    *,
    contract: schemas.Contract = Depends(get_contract),
):
    return DataResponse(success=True, result=contract)


# 계약서 삭제
@router.delete("/{contract_id}", response_model=DataResponse[schemas.Contract])
def delete_contract(
    *,
    contract: schemas.Contract = Depends(get_contract),
    db: Session = Depends(deps.get_db),
):
    contract = crud.contract.remove(db=db, id=contract.id)
    return DataResponse(success=True, result=contract)


# 계약서 데이터 변경
@router.put("/{contract_id}", response_model=DataResponse[schemas.Contract])
def update_contract(
    *,
    contract: schemas.Contract = Depends(get_contract),
    db: Session = Depends(deps.get_db),
    contract_in: schemas.ContractUpdate,
):
    contract = crud.contract.update(db=db, db_obj=contract, obj_in=contract_in)
    return DataResponse(success=True, result=contract)


# 해당 근로자 계약서 생성
@router.post("/", response_model=DataResponse[schemas.Contract])
def create_contract_for_worker(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    contract_in: schemas.ContractCreate,
):
    contract = crud.contract.create_contract(
        db=db, obj_in=contract_in, worker_id=worker.id
    )
    return DataResponse(success=True, result=contract)


# 해당 근로자 전체 계약서 불러오기
@router.get(
    "/worker/{worker_id}/contract",
    response_model=DataResponse[schemas.WorkerContractModel],
)
def read_all_contract_for_worker(
    *,
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

    return DataResponse(success=True, result=response)
