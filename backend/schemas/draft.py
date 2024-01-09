from pydantic import BaseModel
from datetime import date, datetime
from schemas.position import PositionResponse


class DraftBase(BaseModel):
    salary_code: int
    preset: int
    start_period: date
    end_period: date


class DraftCreate(DraftBase):
    position_id: str


class DraftUpdate(BaseModel):
    pass


class Draft(DraftBase):
    id: str
    team_id: str
    create_date: datetime
    position: PositionResponse


class DraftForContract(DraftBase):
    id: str
    team_id: str
    team_name: str
    position_id: str
    unit_pay: int
