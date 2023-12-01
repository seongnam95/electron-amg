from typing import List

from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Team, Position, User
from schemas import TeamCreate, TeamUpdate
from sqlalchemy.orm import Session
from models.associations import user_team


class CRUDTeam(CRUDBase[Team, TeamCreate, TeamUpdate]):
    def get_team_count_by_user(self, db: Session, *, user_id: str) -> int:
        return db.query(User).filter(User.id == user_id).filter(User.teams).count()

    def get_team_for_user(self, db: Session, *, user_id: str) -> List[Team]:
        return (
            db.query(Team)
            .join(user_team, Team.id == user_team.c.team_id)
            .filter(user_team.c.user_id == user_id)
            .all()
        )

    def create_team(self, db: Session, *, user_id: str, obj_in: TeamCreate) -> Team:
        # 'positions'를 제외한 나머지 팀 데이터 처리
        team_data = obj_in.model_dump(exclude={"positions"})
        team_obj = Team(**team_data)

        # 'positions' 처리
        if obj_in.positions:
            for position_data in obj_in.positions:
                position_obj = Position(**position_data.model_dump(), team=team_obj)
                db.add(position_obj)

        # 팀 데이터 저장
        db.add(team_obj)
        db.commit()
        db.flush()

        # 사용자와 팀 연결
        db.execute(user_team.insert().values(user_id=user_id, team_id=team_obj.id))
        db.commit()

        db.refresh(team_obj)
        return team_obj

    def update_team(self, db: Session, *, team: Team, team_in: TeamUpdate) -> Team:
        team_obj_data = jsonable_encoder(team)
        team_in_dict = team_in.model_dump(exclude_unset=True)

        for field in team_obj_data:
            if field in team_in_dict:
                setattr(team, field, team_in_dict[field])

        if "user_id" in team_in_dict:
            db.execute(user_team.delete().where(user_team.c.team_id == team.id))
            if team_in_dict["user_id"] is not None:
                db.execute(
                    user_team.insert().values(
                        user_id=team_in_dict["user_id"], team_id=team.id
                    )
                )

        db.add(team)
        db.commit()
        db.refresh(team)
        return team


team = CRUDTeam(Team)
