from typing import List, Optional
from pydantic import BaseModel, model_validator, field_validator, validator
from schemas.contract import ContractResponse
from schemas.attendance import Attendance
from schemas.common import check_update_fields
from util.crypto import encrypt, decrypt
from util.image_converter import base64_to_image

from exceptions import InvalidCodeError
from datetime import datetime

# 성별 코드 [1: 남자, 2: 여자]
GENDER_CODES = [1, 2]


class EmployeeBase(BaseModel):
    name: str
    gender_code: int
    phone: str
    residence: str
    bank: str
    bank_num: str
    ssn: str
    bank_book: str
    id_card: str

    @field_validator("gender_code")
    def validate_gender_code(cls, value):
        if value not in GENDER_CODES:
            raise InvalidCodeError("gender")
        return value


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    residence: Optional[str] = None
    bank: Optional[str] = None
    bank_num: Optional[str] = None
    ssn: Optional[str] = None
    bank_book: Optional[str] = None
    id_card: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Employee(EmployeeBase):
    id: int
    create_date: datetime

    class Config:
        from_attributes = True


class EmployeeBaseResponse(BaseModel):
    id: int
    name: str
    phone: str
    residence: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    phone: str
    residence: str
    gender_code: int
    create_date: datetime

    has_contract: bool
    is_attendance: bool

    contract: Optional[ContractResponse] = None
    attendances: Optional[List[Attendance]] = None

    class Config:
        from_attributes = True


class EmployeeMultiDeleteBody(BaseModel):
    employeeIds: List[int]


class CoveringEmployeeResponse(EmployeeBaseResponse):
    bank: str
    bank_num_cover: str
    bank_book: str
    id_card: str
