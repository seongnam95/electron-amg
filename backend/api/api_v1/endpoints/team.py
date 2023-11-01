from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import ListResponse, BaseResponse, DataResponse


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# ? DEV
# 팀 불러오기
@router.get("/{team_id}", response_model=DataResponse[schemas.Team])
def read_team(
    team_id: int,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 팀 입니다.")

    return DataResponse(msg="정상 처리되었습니다.", result=team)


# ! 미사용
# 모든 팀 불러오기
@router.get("/", response_model=ListResponse[schemas.Team])
def read_all_team(
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    offset = (page - 1) * limit

    teams = crud.team.get_multi(db, offset=offset, limit=limit)
    if not teams:
        raise HTTPException(status_code=404, detail="생성된 팀이 없습니다.")

    response = deps.create_list_response(
        data=teams, total=len(teams), limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# ? DEV
# 팀 생성 (개별)
@router.post("/", response_model=BaseResponse)
def create_team(team_in: schemas.TeamCreate, db: Session = Depends(deps.get_db)):
    crud.team.create(db=db, obj_in=team_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 팀 업데이트
@router.put("/{team_id}", response_model=BaseResponse)
def update_team(
    team_id: int,
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
@router.delete("/{team_id}", response_model=BaseResponse)
def delete_team(
    team_id: int,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 팀 입니다.")

    crud.team.remove(db=db, id=team.id)
    return BaseResponse(msg="정상 처리되었습니다.")


# 직위 생성
@router.post("/{team_id}/position", response_model=BaseResponse)
def create_position_by_team(
    team_id: int,
    position_in: schemas.PositionCreate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    crud.position.create_position(db=db, obj_in=position_in, team_id=team_id)
    return BaseResponse(msg="정상 처리되었습니다.")


# 계약 초안 생성
@router.post("/{team_id}/draft", response_model=DataResponse[schemas.Draft])
def create_draft_by_team(
    team_id: int,
    draft_in: schemas.DraftCreate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    draft = crud.draft.create_draft(db=db, draft_in=draft_in, team_id=team_id)
    return DataResponse(msg="정상 처리되었습니다.", result=draft)


# 모든 계약 초안 불러오기
@router.get("/{team_id}/draft", response_model=ListResponse[schemas.Draft])
def read_all_draft_by_team(
    team_id: int,
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
