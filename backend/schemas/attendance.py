from pydantic import BaseModel
from typing import Optional

from schemas.position import PositionResponse


class AttendanceCreate(BaseModel):
    position_id: str
    meal_included: bool
    pay: Optional[int] = None
    pre_pay: Optional[int] = None
    memo: Optional[str] = None
    working_date: Optional[str] = None


class AttendanceUpdate(BaseModel):
    pay: Optional[int] = None
    pre_pay: Optional[int] = None
    memo: Optional[str] = None
    meal_included: Optional[bool] = None


class AttendanceResponse(BaseModel):
    id: str
    pay: int
    pre_pay: int
    memo: str
    meal_included: bool
    working_date: str
    employee_id: str
    position_id: str
    position: PositionResponse

    class Config:
        from_attributes = True
