from typing import Any, List

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps


import crud, schemas


router = APIRouter()


@router.get("/", response_model=List[schemas.Worker])
def read_all_worker(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    workers = crud.worker.get_multi(db, skip=skip, limit=limit)
    return workers


@router.post("/", response_model=schemas.Worker)
def create_worker(
    *, db: Session = Depends(deps.get_db), worker_in: schemas.WorkerCreate
):
    worker = crud.worker.create(db=db, obj_in=worker_in)
    return worker


@router.get("/{id}", response_model=schemas.Worker)
def read_worker(db: Session = Depends(deps.get_db), id=int):
    worker = crud.worker.get(db=db, id=id)

    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    return worker


@router.put("/{id}", response_model=schemas.Worker)
def update_worker(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    worker_in: schemas.WorkerUpdate,
) -> Any:
    worker = crud.worker.get(db=db, id=id)

    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    worker = crud.worker.update(db=db, db_obj=worker, obj_in=worker_in)
    return worker


@router.delete("/{id}", response_model=schemas.Worker)
def delete_worker(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    worker = crud.worker.get(db=db, id=id)

    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    worker = crud.worker.remove(db=db, id=id)
    return worker
