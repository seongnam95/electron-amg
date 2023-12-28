from pydantic import BaseModel, model_validator
from typing import Optional
from schemas.common import check_update_fields


class PositionBase(BaseModel):
    name: str
    color: str
    standard_pay: int
    sorting_index: int
    is_leader: bool
    default_earns_incentive: bool
    incentive_pay: Optional[int] = None


class PositionCreate(PositionBase):
    pass


class PositionUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    is_leader: Optional[bool] = None
    default_earns_incentive: Optional[bool] = None
    is_active: Optional[bool] = None
    unit_id: Optional[str] = None
    incentive_pay: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class PositionResponse(PositionBase):
    id: str
    team_id: str
    unit_id: str

    class Config:
        from_attributes = True
