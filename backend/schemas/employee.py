from typing import Optional
from pydantic import BaseModel, model_validator
from schemas.position import PositionResponse
from schemas.common import check_update_fields
from datetime import datetime, date


class EmployeeBase(BaseModel):
    name: str
    phone: str
    address: str
    start_period: date
    end_period: date
    bank: str
    bank_num: str
    ssn: str
    bank_book: str
    id_card: str
    sign_base64: str
    position_id: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    phone: Optional[str] = None
    address: Optional[str] = None
    bank: Optional[str] = None
    bank_num: Optional[str] = None
    bank_book: Optional[str] = None
    id_card: Optional[str] = None
    position_id: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Employee(EmployeeBase):
    id: str
    create_date: datetime

    class Config:
        from_attributes = True


class EncryptEmployee(BaseModel):
    id: str
    name: str
    phone: str
    address: str
    start_period: date
    end_period: date
    bank: str
    bank_num_enc: str
    ssn_enc: str
    bank_book_file_nm: str
    id_card_file_nm: str
    sign_base64: str
    position_id: str
    create_date: datetime
    position: PositionResponse

    class Config:
        from_attributes = True


###############################################################
# Response
###############################################################


# 기본 (계약서 작성 시 보이게 될 최소 정보)
class EmployeeCoveringResponse(BaseModel):
    id: str
    name: str
    phone: str
    address: str
    bank: str
    bank_num_cover: str

    class Config:
        from_attributes = True


# 관리자의 리스트에 표기될 데이터
class EmployeeResponse(BaseModel):
    id: str
    name: str
    phone: str
    address: str
    ssn: str
    bank: str
    bank_num: str
    start_period: date
    end_period: date
    create_date: datetime
    position: PositionResponse

    class Config:
        from_attributes = True


class EmployeeDocumentResponse(BaseModel):
    id: str
    bank_book: str
    id_card: str
    sign_base64: str
