from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from response_model import DataResponse
from schemas import Form, FormCreate
import models
import random
import string
from ... import deps

router = APIRouter()


@router.get("/{id}", response_model=DataResponse[Form])
def get_form(
    id: str,
    db: Session = Depends(deps.get_db),
):
    form = db.query(models.Form).filter(models.Form.id == id).first()
    if not form:
        raise HTTPException(status_code=404, detail="유효하지 않습니다.")

    return DataResponse(success=True, msg="정상 처리되었습니다.", result=form)


# 폼 생성
@router.post("/", response_model=DataResponse[Form])
def create_form(
    db: Session = Depends(deps.get_db),
    *,
    form_in: FormCreate,
):
    while True:
        id_ = "".join(random.choices(string.ascii_letters + string.digits, k=6))
        if not db.query(models.Form).filter_by(id=id_).first():
            break

    form_in_data = jsonable_encoder(form_in)
    form_in_data["id"] = id_
    form_in_data["start_period"] = datetime.strptime(
        form_in_data["start_period"], "%Y-%m-%d"
    ).date()
    form_in_data["end_period"] = datetime.strptime(
        form_in_data["end_period"], "%Y-%m-%d"
    ).date()

    db_obj = models.Form(**form_in_data)

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return DataResponse(success=True, msg="정상 처리되었습니다.", result=db_obj)
