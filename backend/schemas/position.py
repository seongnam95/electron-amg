from pydantic import BaseModel, model_validator
from typing import Optional
from schemas.common import check_update_fields


class PositionBase(BaseModel):
    position_code: int
    name: str
    unit_pay: int


class PositionCreate(PositionBase):
    pass


class PositionUpdate(PositionBase):
    position_code: Optional[int] = None
    name: Optional[str] = None
    unit_pay: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Position(PositionBase):
    id: int
    team_id: int

    class Config:
        from_attributes = True
