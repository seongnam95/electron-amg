from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from ... import deps

import crud, schemas
from response_model import ListResponse, BaseResponse, DataResponse


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


# 팀 불러오기
@router.get("/{team_id}", response_model=DataResponse[schemas.Team])
def delete_team(
    team_id: int,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 팀 입니다.")

    return DataResponse(msg="정상 처리되었습니다.", result=team)


# 모든 팀 불러오기
@router.get("/", response_model=ListResponse[schemas.Team])
def read_all_team(
    db: Session = Depends(deps.get_db),
    page: int = 1,
    limit: int = 100,
):
    offset = (page - 1) * limit
    total = crud.employee.get_count(db)

    teams = crud.team.get_multi(db, offset=offset, limit=limit)
    if not teams:
        raise HTTPException(status_code=404, detail="생성된 팀이 없습니다.")

    response = deps.create_list_response(
        data=teams, total=total, limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 팀 생성
@router.post("/", response_model=BaseResponse)
def create_team(team_in: schemas.TeamCreate, db: Session = Depends(deps.get_db)):
    if team_in.user_id:
        user = crud.user.get(db, id=team_in.user_id)
        if not user:
            raise HTTPException(status_code=404, detail="존재하지 않는 계정입니다.")

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

    crud.team.update(db=db, db_obj=team, obj_in=team_in)
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
def create_position(
    team_id: int,
    position_in: schemas.PositionCreate,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    crud.position.create_position(db=db, obj_in=position_in, team_id=team_id)
    return BaseResponse(msg="정상 처리되었습니다.")
