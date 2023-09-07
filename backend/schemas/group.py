from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime
from schemas.user import UserResponse

from schemas.common import check_update_fields


class GroupBase(BaseModel):
    name: str
    hex_color: str
    explanation: Optional[str] = None


class GroupCreate(GroupBase):
    user_id: Optional[int] = None
    pass


class GroupUpdate(BaseModel):
    name: Optional[str] = None
    hex_color: Optional[str] = None
    explanation: Optional[str] = None
    user_id: Optional[int] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Group(GroupBase):
    id: int
    user: Optional[UserResponse] = None
    create_date: datetime

    class Config:
        from_attributes = True
