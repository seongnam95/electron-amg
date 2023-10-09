from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime
from schemas.common import check_update_fields


class WorkLogBase(BaseModel):
    position_code: int
    wage: int


class WorkLogCreate(WorkLogBase):
    working_date: Optional[str] = None
    pass


class WorkLogUpdate(WorkLogBase):
    wage: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class WorkLog(WorkLogBase):
    id: int
    working_date: str
    employee_id: int

    class Config:
        from_attributes = True
