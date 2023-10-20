from typing import Optional
from pydantic import BaseModel, model_validator
from datetime import datetime

from schemas.common import check_update_fields


class TeamBase(BaseModel):
    name: str
    color: str
    meal_cost: int
    user_id: Optional[int] = None


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

    class Config:
        from_attributes = True
