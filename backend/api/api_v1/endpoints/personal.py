from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

from fastapi import Path
import crud, schemas


router = APIRouter()


@router.get("/", response_model=schemas.Personal)
def read_personal(worker_id: int = Path(...), db: Session = Depends(deps.get_db)):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    personal = crud.personal.get_for_worker(db=db, worker_id=worker_id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    return personal


@router.post("/", response_model=schemas.Personal)
def create_personal(
    *,
    worker_id: int = Path(...),
    db: Session = Depends(deps.get_db),
    personal_in: schemas.PersonalCreate,
):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    personal = crud.personal.create_for_worker(
        db=db, obj_in=personal_in, worker_id=worker_id
    )
    return personal


@router.put("/", response_model=schemas.Personal)
def update_personal(
    *,
    worker_id: int = Path(...),
    db: Session = Depends(deps.get_db),
    personal_in: schemas.PersonalUpdate,
) -> Any:
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    personal = crud.personal.get_for_worker(db=db, worker_id=worker_id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    personal = crud.personal.update(db=db, db_obj=personal, obj_in=personal_in)
    return personal


@router.delete("/", response_model=schemas.Personal)
def delete_personal(*, worker_id: int = Path(...), db: Session = Depends(deps.get_db)):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    personal = crud.personal.get_for_worker(db=db, worker_id=worker_id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    personal = crud.personal.remove_for_worker(db=db, worker_id=worker_id)
    return personal
