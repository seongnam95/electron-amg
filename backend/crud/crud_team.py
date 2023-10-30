from typing import Optional
from crud.base import CRUDBase
from models import Team
from schemas import TeamCreate, TeamUpdate
from sqlalchemy.orm import Session


class CRUDTeam(CRUDBase[Team, TeamCreate, TeamUpdate]):
    pass


team = CRUDTeam(Team)
