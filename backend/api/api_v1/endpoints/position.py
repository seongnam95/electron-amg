from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import ListResponse, BaseResponse, DataResponse


router = APIRouter()


# ! 사용  X
# 직위 불러오기
@router.get("/{position_id}", response_model=DataResponse[schemas.PositionResponse])
def read_position(
    position_id: str,
    db: Session = Depends(deps.get_db),
):
    position = crud.position.get(db=db, id=position_id)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 직위 입니다.")

    return DataResponse(msg="정상 처리되었습니다.", result=position)


# ! 사용  X
# 모든 직위 불러오기
@router.get("/", response_model=ListResponse[schemas.PositionResponse])
def read_all_position(
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    offset = (page - 1) * limit
    total = crud.employee.get_count(db)

    positions = crud.position.get_multi(db, offset=offset, limit=limit)

    response = deps.create_list_response(
        data=positions, total=total, limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 직위 업데이트
@router.put("/{position_id}", response_model=BaseResponse)
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
@router.delete("/{position_id}", response_model=DataResponse[schemas.PositionResponse])
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
@router.delete("/{position_id}", response_model=DataResponse[schemas.PositionResponse])
def delete_position(
    position_id: str,
    db: Session = Depends(deps.get_db),
):
    position = crud.position.delete(db=db, id=position_id)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 직위 입니다.")

    crud.position.delete(db=db, id=position.id)
    return DataResponse(msg="정상 처리되었습니다.", result=schemas.PositionResponse)
