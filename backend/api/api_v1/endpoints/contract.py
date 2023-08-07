from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps
from fastapi import Path

import crud, schemas


router = APIRouter()


@router.get("/", response_model=schemas.ContractResponse)
def read_all_contract(
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    contracts = crud.contract.get_multi_for_worker(db=db, worker_id=worker.id)

    if not contracts:
        raise HTTPException(status_code=404, detail="contract not found")

    valid_contract = None
    prev_contracts = []
    for contract in contracts:
        if contract.valid:
            valid_contract = contract
        else:
            prev_contracts.append(contract)

    response = schemas.ContractResponse(
        valid_contract=valid_contract,
        prev_contract_count=len(prev_contracts),
        prev_contracts=prev_contracts,
    )

    return response


@router.post("/", response_model=schemas.Contract)
def create_contract(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    contract_in: schemas.ContractCreate
):
    contract = crud.contract.create_contract(
        db=db, obj_in=contract_in, worker_id=worker.id
    )
    return contract


@router.delete("/{contract_id}", response_model=schemas.Contract)
def delete_contract(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db)
):
    contract = crud.contract.get_for_worker(db=db, worker_id=worker.id)

    if not contract:
        raise HTTPException(status_code=404, detail="contract not found")

    contract = crud.contract.remove_for_worker(db=db, worker_id=worker.id)
    return contract


# @router.put("/{contract_id}", response_model=schemas.Contract)
# def update_contract(
#     *,
#     db: Session = Depends(deps.get_db),
#     id: int,
#     contract_in: schemas.ContractUpdate,
# ) -> Any:
#     contract = crud.contract.get(db=db, id=id)

#     if not contract:
#         raise HTTPException(status_code=404, detail="contract not found")

#     contract = crud.contract.update(db=db, db_obj=contract, obj_in=contract_in)
#     return contract


# @router.delete("/{contract_id}", response_model=schemas.Contract)
# def delete_contract(
#     *,
#     db: Session = Depends(deps.get_db),
#     id: int,
# ):
#     contract = crud.contract.get(db=db, id=id)

#     if not contract:
#         raise HTTPException(status_code=404, detail="contract not found")

#     contract = crud.contract.remove(db=db, id=id)
#     return contract
