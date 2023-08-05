from typing import Optional
from pydantic import BaseModel, Field, validator


class WorkerBase(BaseModel):
    name: str
    phone: str
    residence: str
    gender_code: int  # 성별 코드 [0: 남자, 1: 여자]
    position_code: int  # 직위 코드 [0: 직원, 1: 알바, 2: 기타]


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    phone: Optional[str] = None
    residence: Optional[str] = None
    position_code: Optional[int] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class Worker(WorkerBase):
    id: int

    class Config:
        orm_mode = True
