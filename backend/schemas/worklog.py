from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime


class WorkLogBase(BaseModel):
    working_date: datetime
    start_datetime: Optional[datetime] = None
    end_datetime: Optional[datetime] = None
    daily_wage: Optional[int] = None


class WorkLogCreate(WorkLogBase):
    pass


class WorkLogUpdate(BaseModel):
    start_datetime: Optional[datetime] = None
    end_datetime: Optional[datetime] = None
    daily_wage: Optional[int] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class WorkLog(WorkLogBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True
