from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps
from fastapi import Path

import crud, schemas


router = APIRouter()


class WorkerNotFoundError(Exception):
    pass


@router.get("/", response_model=schemas.Contract)
def read_contract(worker_id: int = Path(...), db: Session = Depends(deps.get_db)):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    contract = crud.contract.get_for_worker(db=db, worker_id=worker_id)

    if not contract:
        raise HTTPException(status_code=404, detail="contract not found")

    return contract


@router.post("/", response_model=schemas.Contract)
def create_contract(
    *,
    worker_id: int = Path(...),
    db: Session = Depends(deps.get_db),
    contract_in: schemas.ContractCreate
):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    contract = crud.contract.create_for_worker(
        db=db, obj_in=contract_in, worker_id=worker_id
    )
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
