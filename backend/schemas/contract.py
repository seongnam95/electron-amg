from pydantic import BaseModel
from typing import List
from datetime import datetime


class ContractBase(BaseModel):
    company_name: str
    salary: str
    default_wage: int
    sign_base64: str
    start_period: datetime
    end_period: datetime


class ContractCreate(ContractBase):
    pass


class ContractUpdate(ContractBase):
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
