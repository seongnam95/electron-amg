from pydantic import BaseModel
from datetime import date, datetime


class DraftBase(BaseModel):
    position_id: int
    start_period: date
    end_period: date


class DraftCreate(DraftBase):
    pass


class DraftUpdate(BaseModel):
    pass


class Draft(DraftBase):
    id: str
    team_id: int
    create_date: datetime
