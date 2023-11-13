from pydantic import BaseModel, model_validator
from typing import List, Optional
from schemas.common import check_update_fields
from schemas.position import Position


class AttendanceBase(BaseModel):
    pay: int
    working_date: str
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    memo: Optional[str] = None


class AttendanceCreate(AttendanceBase):
    pass


class AttendanceUpdate(BaseModel):
    pay: Optional[int] = None
    incentive: Optional[int] = None
    deduct: Optional[int] = None
    is_meal_included: Optional[bool] = None
    working_date: Optional[str] = None
    memo: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Attendance(AttendanceBase):
    id: str

    class Config:
        from_attributes = True


class EmployeeAttendanceResponse(BaseModel):
    id: str
    name: str
    position: Position
    attendances: List[Attendance]

    class Config:
        from_attributes = True
