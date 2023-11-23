from pydantic import BaseModel
from typing import Optional


class AttendanceBase(BaseModel):
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    memo: Optional[str] = None
    is_meal_included: bool


class AttendanceCreate(AttendanceBase):
    working_date: Optional[str] = None


class AttendanceUpdate(AttendanceBase):
    pass


class AttendanceResponse(AttendanceBase):
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
