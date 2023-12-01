from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from response_model import BaseResponse, DataResponse, ListResponse
from schemas import Draft, DraftCreate, DraftForContract
from ... import deps

import models
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


# 폼 불러오기 (계약서 작성 시)
@router.get("/{id}/contract", response_model=DataResponse[DraftForContract])
def get_draft(
    id: str,
    db: Session = Depends(deps.get_db),
):
    draft: models.Draft = db.query(models.Draft).get(id)
    if not draft:
        raise HTTPException(status_code=404, detail="유효하지 않습니다.")

    response = DraftForContract(
        id=draft.id,
        start_period=draft.start_period,
        end_period=draft.end_period,
        team_id=draft.team_id,
        team_name=draft.team.name,
        position_id=draft.position_id,
        unit_pay=draft.position.unit_pay,
    )

    return DataResponse(msg="정상 처리되었습니다.", result=response)


# 폼 생성
@router.post("/", response_model=DataResponse[Draft])
def create_draft(
    draft_in: DraftCreate,
    db: Session = Depends(deps.get_db),
):
    draft_in_data = draft_in.model_dump()
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


# 폼 삭제
@router.delete("/{draft_id}", response_model=BaseResponse)
def delete_draft(
    draft_id: str,
    db: Session = Depends(deps.get_db),
):
    draft = crud.draft.get(db=db, id=draft_id)
    if not draft:
        raise HTTPException(status_code=404, detail="존재하지 않는 폼 입니다.")

    crud.draft.delete(db=db, id=draft.id)
    return BaseResponse(msg="정상 처리되었습니다.")
