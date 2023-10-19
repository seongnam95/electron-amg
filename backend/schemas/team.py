from typing import Optional
from pydantic import BaseModel, model_validator
from datetime import datetime

from schemas.common import check_update_fields


class TeamCreate(BaseModel):
    name: str
    color: str
    user_id: Optional[int] = None


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    color: Optional[str] = None
    user_id: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class TeamResponse(BaseModel):
    id: int
    name: str
    color: str
    create_date: datetime
    user_id: Optional[int] = None

    class Config:
        from_attributes = True
