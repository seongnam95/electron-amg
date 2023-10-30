from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from response_model import DataResponse, ListResponse
from schemas import Draft, DraftCreate
from ... import deps

import models
import random
import string
import crud

router = APIRouter()


@router.get("/", response_model=ListResponse[Draft])
def get_draft_all(
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    offset = (page - 1) * limit
    total = crud.draft.get_count(db)

    drafts = crud.draft.get_multi(db, offset=offset, limit=limit)
    if not drafts:
        raise HTTPException(status_code=404, detail="생성된 팀이 없습니다.")

    response = deps.create_list_response(
        data=drafts, total=total, limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 폼 불러오기
@router.get("/{id}", response_model=DataResponse[Draft])
def get_draft(
    id: str,
    db: Session = Depends(deps.get_db),
):
    draft = db.query(models.Draft).filter(models.Draft.id == id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="유효하지 않습니다.")

    return DataResponse(msg="정상 처리되었습니다.", result=draft)


# 폼 생성
@router.post("/", response_model=DataResponse[Draft])
def create_draft(
    draft_in: DraftCreate,
    db: Session = Depends(deps.get_db),
):
    # 랜덤 ID 생성 (중복 시, 재생성)
    while True:
        id_ = "".join(random.choices(string.ascii_letters + string.digits, k=4))
        if not db.query(models.Draft).filter_by(id=id_).first():
            break

    draft_in_data = draft_in.model_dump()
    draft_in_data["id"] = id_
    draft_in_data["start_period"] = datetime.strptime(
        draft_in_data["start_period"], "%Y-%m-%d"
    ).date()
    draft_in_data["end_period"] = datetime.strptime(
        draft_in_data["end_period"], "%Y-%m-%d"
    ).date()

    db_obj = models.Draft(**draft_in_data)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return DataResponse(msg="정상 처리되었습니다.", result=db_obj)
