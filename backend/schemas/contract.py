from pydantic import BaseModel, field_validator
from typing import List
from datetime import datetime, date
from exceptions import InvalidCodeError

# 직위 코드 [1: 팀장, 2: 부팀장, 3: 알바, 4: 기사, 5: 홍보단, 6: 기타]
POSITION_CODES = [1, 2, 3, 4, 5, 6]


class ContractBase(BaseModel):
    salary: str
    position_code: int
    group_name: str
    default_wage: int
    start_period: date
    end_period: date
    sign_base64: str

    @field_validator("position_code")
    def validate_position_code(cls, value):
        if value not in POSITION_CODES:
            raise InvalidCodeError("position")
        return value


class ContractCreate(ContractBase):
    pass


class ContractUpdate(ContractBase):
    pass


class Contract(ContractBase):
    id: int
    employee_id: int
    create_date: datetime
    valid: bool

    class Config:
        from_attributes = True


class ContractResponse(BaseModel):
    salary: str
    position_code: int
    group_name: str
    default_wage: int
    start_period: date
    end_period: date
    create_date: datetime


class EmployeeContractModel(BaseModel):
    valid_contract: Contract
    prev_contract_count: int
    prev_contracts: List[Contract]
