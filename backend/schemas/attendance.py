from pydantic import BaseModel, model_validator
from typing import Optional
from schemas.common import check_update_fields


class AttendanceBase(BaseModel):
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    memo: Optional[str] = None
    is_meal_included: Optional[bool] = None


class AttendanceCreate(AttendanceBase):
    working_date: Optional[str] = None


class AttendanceUpdate(AttendanceBase):
    pass


class Attendance(AttendanceBase):
    id: str
    pay: int
    is_meal_included: bool
    incentive: int
    deduct: int
    memo: str
    working_date: str
    employee_id: str

    class Config:
        from_attributes = True
