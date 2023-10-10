from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from response_model import DataResponse, ListResponse
from schemas import Draft, DraftCreate
import models
import random
import string
from ... import deps

router = APIRouter()


@router.get("/", response_model=ListResponse[Draft])
def get_draft_all(db: Session = Depends(deps.get_db)):
    drafts = db.query(models.Draft).all()
    return ListResponse(msg="정상 처리되었습니다.", count=len(drafts), result=drafts)


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
    db: Session = Depends(deps.get_db),
    *,
    draft_in: DraftCreate,
):
    while True:
        id_ = "".join(random.choices(string.ascii_letters + string.digits, k=6))
        if not db.query(models.Draft).filter_by(id=id_).first():
            break

    draft_in_data = jsonable_encoder(draft_in)
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
