from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas


router = APIRouter()


@router.get("/{contract_id}", response_model=schemas.Contract)
def read_contract(db: Session = Depends(deps.get_db), id=int):
    contract = crud.contract.get(db=db, id=id)

    if not contract:
        raise HTTPException(status_code=404, detail="contract not found")

    return contract


@router.post("/", response_model=schemas.Contract)
def create_contract(
    *, db: Session = Depends(deps.get_db), contract_in: schemas.ContractCreate
):
    contract = crud.contract.create(db=db, obj_in=contract_in)
    return contract


@router.put("/{contract_id}", response_model=schemas.Contract)
def update_contract(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    contract_in: schemas.ContractUpdate,
) -> Any:
    contract = crud.contract.get(db=db, id=id)

    if not contract:
        raise HTTPException(status_code=404, detail="contract not found")

    contract = crud.contract.update(db=db, db_obj=contract, obj_in=contract_in)
    return contract


@router.delete("/{contract_id}", response_model=schemas.Contract)
def delete_contract(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    contract = crud.contract.get(db=db, id=id)

    if not contract:
        raise HTTPException(status_code=404, detail="contract not found")

    contract = crud.contract.remove(db=db, id=id)
    return contract
