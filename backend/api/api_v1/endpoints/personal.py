from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

from fastapi import Path
import crud, schemas
from response_model import BaseResponse


router = APIRouter()


@router.get("/", response_model=BaseResponse[schemas.Personal])
def read_personal(
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    personal = crud.personal.get_for_worker(db=db, worker_id=worker.id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    return BaseResponse(success=True, result=personal)


@router.post("/", response_model=BaseResponse[schemas.Personal])
def create_personal(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    personal_in: schemas.PersonalCreate,
):
    personal = crud.personal.create_personal(
        db=db, obj_in=personal_in, worker_id=worker.id
    )
    print(personal)
    return BaseResponse(success=True, result=personal)


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
    return BaseResponse(success=True, result=personal)


@router.delete("/", response_model=schemas.Personal)
def delete_personal(*, worker_id: int = Path(...), db: Session = Depends(deps.get_db)):
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    personal = crud.personal.get_for_worker(db=db, worker_id=worker_id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    personal = crud.personal.remove_for_worker(db=db, worker_id=worker_id)
    return BaseResponse(success=True, result=personal)
