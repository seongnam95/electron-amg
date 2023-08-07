from typing import Optional
from pydantic import BaseModel, Field, model_validator, field_validator
from schemas.common import check_update_fields

from exceptions import InvalidCodeError

GENDER_CODES = [0, 1]  # 성별 코드 [0: 남자, 1: 여자]
POSITION_CODES = [0, 1, 2]  # 직위 코드 [0: 직원, 1: 알바, 2: 기타]


class WorkerBase(BaseModel):
    name: str
    phone: str
    residence: str
    gender_code: int
    position_code: int

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
    phone: Optional[str] = None
    residence: Optional[str] = None
    position_code: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Worker(WorkerBase):
    id: int

    class Config:
        from_attributes = True
