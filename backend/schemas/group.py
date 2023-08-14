from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime

from schemas.common import check_update_fields


class GroupBase(BaseModel):
    name: str
    hex_color: str
    explanation: str


class GroupCreate(GroupBase):
    pass


class GroupUpdate(BaseModel):
    name: Optional[str] = None
    hex_color: Optional[str] = None
    explanation: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Group(GroupBase):
    id: int
    create_date: datetime

    class Config:
        from_attributes = True
