from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas


router = APIRouter()


@router.get("/", response_model=schemas.Personal)
def read_personal(worker_id=int, db: Session = Depends(deps.get_db)):
    personal = crud.personal.get_individual(db=db, worker_id=worker_id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    return personal


@router.post("/", response_model=schemas.Personal)
def create_personal(
    *, db: Session = Depends(deps.get_db), personal_in: schemas.PersonalCreate
):
    personal = crud.personal.create(db=db, obj_in=personal_in)
    return personal


@router.put("/", response_model=schemas.Personal)
def update_personal(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    personal_in: schemas.PersonalUpdate,
) -> Any:
    personal = crud.personal.get(db=db, id=id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    personal = crud.personal.update(db=db, db_obj=personal, obj_in=personal_in)
    return personal


@router.delete("/", response_model=schemas.Personal)
def delete_personal(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    personal = crud.personal.get(db=db, id=id)

    if not personal:
        raise HTTPException(status_code=404, detail="personal not found")

    personal = crud.personal.remove(db=db, id=id)
    return personal
