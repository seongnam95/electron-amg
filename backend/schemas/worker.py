from typing import List, Optional
from pydantic import BaseModel, model_validator, field_validator
from schemas.common import check_update_fields
from schemas.personal import PersonalBase

from exceptions import InvalidCodeError
from datetime import datetime

# 성별 코드 [1: 남자, 2: 여자]
GENDER_CODES = [1, 2]

# 직위 코드 [1: 팀장, 2: 부팀장, 3: 알바, 4: 기사, 5: 홍보단, 6: 기타]
POSITION_CODES = [1, 2, 3, 4, 5, 6]


class WorkerBase(BaseModel):
    name: str
    gender_code: int
    phone: str
    residence: str
    position_code: int
    group_id: Optional[int] = None
    personal: PersonalBase

    @field_validator("gender_code")
    def validate_gender_code(cls, value):
        if value not in GENDER_CODES:
            raise InvalidCodeError("gender")
        return value

    @field_validator("position_code")
    def validate_position_code(cls, value):
        if value not in POSITION_CODES:
            raise InvalidCodeError("position")
        return value


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    name: Optional[str] = None
    group_id: Optional[int] = None
    phone: Optional[str] = None
    residence: Optional[str] = None
    position_code: Optional[int] = None
    personal: Optional[PersonalBase] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Worker(WorkerBase):
    id: int
    create_date: datetime

    class Config:
        from_attributes = True


class WorkerGroupChange(BaseModel):
    group_id: Optional[int] = None
    worker_ids: List[int]
