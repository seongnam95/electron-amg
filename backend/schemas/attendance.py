from pydantic import BaseModel, model_validator
from typing import Optional
from schemas.common import check_update_fields


class AttendanceBase(BaseModel):
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    working_date: Optional[str] = None
    memo: Optional[str] = None


class AttendanceCreate(AttendanceBase):
    pay: int


class AttendanceUpdate(AttendanceBase):
    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Attendance(AttendanceBase):
    id: int
    pay: int

    class Config:
        from_attributes = True
