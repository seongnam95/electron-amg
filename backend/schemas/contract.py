from pydantic import BaseModel, model_validator
from typing import List, Optional
from datetime import datetime

from schemas.worker import WorkerCreate
from schemas.common import check_update_fields


class ContractBase(BaseModel):
    company_name: str
    salary: str
    default_wage: int
    start_period: datetime
    end_period: datetime


class ContractCreate(ContractBase):
    pass


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
