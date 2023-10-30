from pydantic import BaseModel
from datetime import date, datetime


class DraftBase(BaseModel):
    start_period: date
    end_period: date
    team_id: int
    position_id: int


class DraftCreate(DraftBase):
    pass


class DraftUpdate(BaseModel):
    pass


class Draft(DraftBase):
    id: str
    create_date: datetime
