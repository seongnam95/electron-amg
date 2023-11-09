from pydantic import BaseModel, model_validator
from typing import Optional
from schemas.common import check_update_fields


class PositionBase(BaseModel):
    name: str
    color: str
    salary_code: int
    pay: int


class PositionCreate(PositionBase):
    pass


class PositionUpdate(PositionBase):
    name: Optional[str] = None
    color: Optional[str] = None
    salary_code: Optional[int] = None
    pay: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Position(PositionBase):
    id: str

    class Config:
        from_attributes = True
