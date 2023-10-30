from typing import List, Optional
from pydantic import BaseModel, model_validator
from datetime import datetime

from schemas.common import check_update_fields
from schemas.position import Position
from schemas.employee import EmployeeResponse


class TeamBase(BaseModel):
    name: str
    color: str
    meal_cost: int


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    meal_cost: Optional[int] = None
    user_id: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Team(TeamBase):
    id: int
    create_date: datetime
    positions: List[Position]

    class Config:
        from_attributes = True


class TeamWithEmployee(Team):
    employees: List[EmployeeResponse]

    class Config:
        from_attributes = True
