from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime
from schemas.common import check_update_fields


class WorkLogBase(BaseModel):
    date_str: Optional[str] = None
    remarks: Optional[str] = None


class WorkLogCreate(WorkLogBase):
    pass


class WorkLogUpdate(WorkLogBase):
    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class WorkLog(WorkLogBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True
