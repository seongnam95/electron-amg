from typing import Optional
from pydantic import BaseModel, Field, validator
from enum import Enum


# 성별 코드 [0: 남자, 1: 여자]
class Gender(Enum):
    MALE = 0
    FEMALE = 1


# 직위 코드 [0: 직원, 1: 알바, 2: 기타]
class Position(Enum):
    STAFF = 0
    PART_TIME = 1
    ETC = 2


class WorkerBase(BaseModel):
    name: str
    phone: str = Field(..., pattern="^\+\d{1,3}\d{1,14}(\s\d{1,13})?$")
    residence: str
    gender_code: Gender
    position_code: Position


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    phone: Optional[str] = Field(None, pattern="^\+\d{1,3}\d{1,14}(\s\d{1,13})?$")
    residence: Optional[str] = None
    position_code: Optional[Position] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class Worker(WorkerBase):
    id: int

    class Config:
        from_attributes = True
