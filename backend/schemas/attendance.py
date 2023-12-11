from pydantic import BaseModel
from typing import Optional

from schemas.position import PositionResponse


class AttendanceCreate(BaseModel):
    working_date: Optional[str] = None
    is_paid: Optional[bool] = None
    memo: Optional[str] = None
    include_meal_cost: Optional[bool] = None
    ot_count: Optional[int] = None
    position_id: Optional[str] = None


class AttendanceUpdate(AttendanceCreate):
    pass


class AttendanceResponse(BaseModel):
    id: str
    memo: str
    is_paid: bool
    include_meal_cost: bool
    ot_count: int
    working_date: str
    employee_id: str
    position_id: str
    position: PositionResponse

    class Config:
        from_attributes = True
