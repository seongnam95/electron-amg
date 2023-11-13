from typing import List, Optional
from pydantic import BaseModel, model_validator
from schemas.attendance import Attendance
from schemas.position import Position
from schemas.team import Team
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
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    bank: Optional[str] = None
    bank_num: Optional[str] = None
    ssn: Optional[str] = None
    bank_book: Optional[str] = None
    id_card: Optional[str] = None
    sign_base64: Optional[str] = None
    start_period: Optional[date] = None
    end_period: Optional[date] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Employee(EmployeeBase):
    id: str
    create_date: datetime

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

    start_period: date
    end_period: date
    create_date: datetime

    position: Position

    class Config:
        from_attributes = True


class EmployeeDetailResponse(EmployeeBase):
    position: Position
