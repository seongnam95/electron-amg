from pydantic import BaseModel, model_validator
from typing import List, Optional
from schemas.common import check_update_fields
from schemas.position import Position


class AttendanceBase(BaseModel):
    working_date: Optional[str] = None
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    memo: Optional[str] = None


class AttendanceCreate(AttendanceBase):
    working_date: Optional[str] = None
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    memo: Optional[str] = None


class AttendanceUpdate(BaseModel):
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    memo: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Attendance(AttendanceBase):
    id: str
    working_date: str
    pay: int
    is_meal_included: bool
    employee_id: str
    incentive: int
    deduct: int
    memo: str

    class Config:
        from_attributes = True


class AttendanceMonthly(BaseModel):
    id: str
    name: str
    position: Position
    attendances: List[Attendance]

    class Config:
        from_attributes = True


class AttendanceDaily(Attendance):
    is_attendance: bool
    meal_cost: int
    employee_id: str
    employee_name: str
    position: Position

    class Config:
        from_attributes = True
