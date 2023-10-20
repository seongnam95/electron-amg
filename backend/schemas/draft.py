from pydantic import BaseModel
from datetime import date, datetime


class DraftBase(BaseModel):
    start_period: date
    end_period: date


class DraftCreate(DraftBase):
    pass


class Draft(DraftBase):
    id: str
    team_id: int
    position_id: int
    create_date: datetime
