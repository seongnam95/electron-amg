from pydantic import BaseModel, model_validator
from typing import List, Optional
from datetime import datetime

from schemas.common import check_update_fields


class ContractBase(BaseModel):
    company_name: str
    default_daily_wage: int
    start_date: datetime
    end_date: datetime


class ContractCreate(ContractBase):
    pass


class ContractUpdate(BaseModel):
    company_name: Optional[str] = None
    default_daily_wage: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    valid: Optional[bool] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Contract(ContractBase):
    id: int
    worker_id: int
    create_date: datetime
    valid: bool

    class Config:
        from_attributes = True


class WorkerContractModel(BaseModel):
    valid_contract: Contract
    prev_contract_count: int
    prev_contracts: List[Contract]
