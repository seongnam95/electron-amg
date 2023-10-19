from crud.base import CRUDBase
from models import Team
from schemas import TeamCreate, TeamUpdate
from sqlalchemy.orm import Session


class CRUDTeam(CRUDBase[Team, TeamCreate, TeamUpdate]):
    def create_team(self, *, db: Session, user_id: int, obj_in: TeamCreate) -> Team:
        team_dic = obj_in.model_dump()
        team_dic["user_id"] = user_id
        db_obj = self.model(**team_dic)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


team = CRUDTeam(Team)
