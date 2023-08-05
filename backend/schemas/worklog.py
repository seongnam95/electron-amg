from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime


class WorkLogBase(BaseModel):
    worker_id: int

    working_date: datetime
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None


class WorkLogCreate(WorkLogBase):
    pass


class WorkLogUpdate(BaseModel):
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class WorkLog(WorkLogBase):
    id: int

    class Config:
        orm_mode = True
