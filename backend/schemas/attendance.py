from pydantic import BaseModel
from typing import Optional

from schemas.position import PositionResponse


class AttendanceCreate(BaseModel):
    include_meal_cost: Optional[bool] = None
    working_date: Optional[str] = None
    position_id: Optional[str] = None


class AttendanceUpdate(AttendanceCreate):
    pay: Optional[int] = None
    is_paid: Optional[bool] = None
    memo: Optional[str] = None
    include_meal_cost: Optional[bool] = None
    ot_count: Optional[int] = None
    position_id: Optional[str] = None


class AttendanceResponse(BaseModel):
    id: str
    pay: int
    is_paid: bool
    memo: str
    include_meal_cost: bool
    working_date: str
    employee_id: str
    position_id: str
    position: PositionResponse

    class Config:
        from_attributes = True
