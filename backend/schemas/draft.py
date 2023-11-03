from pydantic import BaseModel
from datetime import date, datetime
from schemas.position import Position
from schemas.team import Team


class DraftBase(BaseModel):
    start_period: date
    end_period: date


class DraftCreate(DraftBase):
    position_id: int


class DraftUpdate(BaseModel):
    pass


class Draft(DraftBase):
    id: str
    team_id: int
    create_date: datetime
    position: Position


class DraftForContract(DraftBase):
    id: str
    team_id: int
    team_name: str
    position_id: int
    unit_pay: int
