from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import BaseResponse, DataResponse


router = APIRouter()


@router.post(
    "/unit/{unit_id}/position", response_model=DataResponse[schemas.PositionResponse]
)
def create_position_by_unit(
    unit_id: str,
    position_in: schemas.PositionCreate,
    db: Session = Depends(deps.get_db),
):
    unit = crud.unit.get(db, id=unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail="존재하지 않는 데이터입니다.")

    position = crud.position.create_position(db=db, obj_in=position_in, unit_obj=unit)
    return DataResponse(msg="정상 처리되었습니다.", result=position)


# 직위 업데이트
@router.put("/position/{position_id}", response_model=BaseResponse)
def update_position(
    position_id: str,
    position_in: schemas.PositionUpdate,
    db: Session = Depends(deps.get_db),
):
    position = crud.position.get(db=db, id=position_id)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 직위 입니다.")

    crud.position.update(db=db, db_obj=position, obj_in=position_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 직위 비활성화 (Remove)
@router.delete(
    "/position/{position_id}", response_model=DataResponse[schemas.PositionResponse]
)
def remove_position(
    position_id: str,
    db: Session = Depends(deps.get_db),
):
    position = crud.position.delete(db=db, id=position_id)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 직위 입니다.")

    crud.position.remove_position(db=db, position_id=position.id)
    return DataResponse(msg="정상 처리되었습니다.", result=schemas.PositionResponse)


# 직위 삭제
@router.delete(
    "/position/{position_id}", response_model=DataResponse[schemas.PositionResponse]
)
def delete_position(
    position_id: str,
    db: Session = Depends(deps.get_db),
):
    position = crud.position.delete(db=db, id=position_id)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 직위 입니다.")

    crud.position.delete(db=db, id=position.id)
    return DataResponse(msg="정상 처리되었습니다.", result=schemas.PositionResponse)
