from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse


router = APIRouter()


# 근로자 개인정보 불러오기
@router.get("/", response_model=BaseResponse[schemas.Personal])
def read_personal(
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    personal = crud.personal.get_for_worker(db=db, worker_id=worker.id)

    if not personal:
        raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")

    return BaseResponse(success=True, result=personal)


# 근로자 개인정보 생성
@router.post("/", response_model=BaseResponse[schemas.Personal])
def create_personal(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    personal_in: schemas.PersonalCreate,
):
    personal = crud.personal.get_for_worker(db=db, worker_id=worker.id)
    if personal:
        raise HTTPException(status_code=404, detail="데이터가 이미 존재합니다.")

    personal = crud.personal.create_for_worker(
        db=db, obj_in=personal_in, worker_id=worker.id
    )
    return BaseResponse(success=True, result=personal)


# 근로자 개인정보 업데이트
@router.put("/", response_model=BaseResponse[schemas.Personal])
def update_personal(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
    personal_in: schemas.PersonalUpdate,
) -> Any:
    personal = crud.personal.get_for_worker(db=db, worker_id=worker.id)
    if not personal:
        raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")

    personal = crud.personal.update(db=db, db_obj=personal, obj_in=personal_in)
    return BaseResponse(success=True, result=personal)


# 근로자 개인정보 삭제
@router.delete("/", response_model=BaseResponse[schemas.Personal])
def delete_personal(
    *,
    worker: schemas.Worker = Depends(deps.get_worker),
    db: Session = Depends(deps.get_db),
):
    personal = crud.personal.get_for_worker(db=db, worker_id=worker.id)
    if not personal:
        raise HTTPException(status_code=404, detail="데이터를 찾을 수 없습니다.")

    personal = crud.personal.remove(db=db, id=personal.id)
    return BaseResponse(success=True, result=personal)
