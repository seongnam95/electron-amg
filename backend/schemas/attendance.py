from pydantic import BaseModel
from typing import Optional

from schemas.position import PositionResponse


class AttendanceCreate(BaseModel):
    preset: Optional[int] = None
    working_date: Optional[str] = None
    memo: Optional[str] = None
    earns_incentive: Optional[bool] = None
    is_prepaid: Optional[bool] = None
    include_meal_cost: Optional[bool] = None
    ot_count: Optional[int] = None
    position_id: Optional[str] = None


class AttendanceUpdate(AttendanceCreate):
    pass


class AttendanceResponse(BaseModel):
    id: str
    preset: int
    memo: str
    is_prepaid: bool
    include_meal_cost: bool
    earns_incentive: bool

    ot_count: int
    working_date: str
    employee_id: str
    position_id: str
    position: PositionResponse

    class Config:
        from_attributes = True
