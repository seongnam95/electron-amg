from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime


class ContractBase(BaseModel):
    company: str
    daily_pay: int
    start_date: datetime
    end_date: datetime


class ContractCreate(ContractBase):
    pass


class ContractUpdate(BaseModel):
    company: Optional[str] = None
    daily_pay: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class Contract(ContractBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True
