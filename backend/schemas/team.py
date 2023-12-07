from typing import List, Optional
from pydantic import BaseModel, model_validator
from datetime import datetime

from schemas.common import check_update_fields
from schemas.position import PositionCreate, PositionResponse
from schemas.unit import UnitCreate, UnitResponse


class TeamBase(BaseModel):
    name: str
    color: str
    meal_cost: int
    ot_pay: int


class TeamCreate(TeamBase):
    units: List[UnitCreate]


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    meal_cost: Optional[int] = None
    user_id: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Team(TeamBase):
    id: str
    create_date: datetime

    class Config:
        from_attributes = True


class TeamUnitResponse(Team):
    units: List[UnitResponse]

    class Config:
        from_attributes = True


class TeamResponse(Team):
    units: List[UnitResponse]
    positions: List[PositionResponse]

    class Config:
        from_attributes = True
