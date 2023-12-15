from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import ListResponse, BaseResponse, DataResponse


router = APIRouter()


# 팀 업데이트
@router.put("/team/{team_id}", response_model=BaseResponse)
def update_team(
    team_id: str,
    team_in: schemas.TeamUpdate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 팀 입니다.")

    if team_in.user_id:
        user = crud.user.get(db, id=team_in.user_id)
        if not user:
            raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    crud.team.update_team(db=db, team=team, team_in=team_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 팀 삭제
@router.delete("/team/{team_id}", response_model=BaseResponse)
def delete_team(
    team_id: str,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 팀 입니다.")

    crud.team.delete(db=db, id=team.id)
    return BaseResponse(msg="정상 처리되었습니다.")


# ------------------------------------------------------------------------------------------------


# 팀 불러오기
@router.get(
    "/user/{user_id}/team",
    response_model=ListResponse[schemas.TeamResponse],
)
def read_all_team(
    user_id: str,
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    total = crud.employee.get_count(db)
    teams = crud.team.get_team_for_user(db, user_id=user_id)

    response = deps.create_list_response(
        data=teams, total=total, limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 팀 생성 (유저)
@router.post(
    "/user/{user_id}/team", response_model=DataResponse[schemas.TeamUnitResponse]
)
def create_team_by_user(
    user_id: str, team_in: schemas.TeamCreate, db: Session = Depends(deps.get_db)
):
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

    team = crud.team.create_team(db=db, obj_in=team_in, user_id=user_id)

    return DataResponse(msg="정상 처리되었습니다.", result=team)


# [ Draft ]계약 초안 생성
@router.post("/team/{team_id}/draft", response_model=DataResponse[schemas.Draft])
def create_draft_by_team(
    team_id: str,
    draft_in: schemas.DraftCreate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    draft = crud.draft.create_draft(db=db, draft_in=draft_in, team_id=team_id)
    return DataResponse(msg="정상 처리되었습니다.", result=draft)


# [ Draft ] 모든 계약 초안 불러오기
@router.get("/team/{team_id}/draft", response_model=ListResponse[schemas.Draft])
def read_all_draft_by_team(
    team_id: str,
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    drafts = crud.draft.get_multi_draft_by_team(db=db, team_id=team_id)
    response = deps.create_list_response(
        data=drafts, total=len(drafts), limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# [ Employee ] 근로자 생성
@router.post("/team/{team_id}/employee", response_model=BaseResponse)
def create_employee_by_team(
    team_id: str,
    employee_in: schemas.EmployeeCreate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    position_id = employee_in.position_id
    position = next((pos for pos in team.positions if pos.id == position_id), None)
    if not position:
        raise HTTPException(status_code=404, detail="존재하지 않는 직위입니다.")

    crud.employee.create_employee(
        db=db, employee_in=employee_in, team_id=team_id, position_id=position_id
    )

    return BaseResponse(msg="정상 처리되었습니다.")
