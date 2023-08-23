from pydantic import BaseModel, model_validator, root_validator
from typing import Optional
from datetime import datetime

from schemas.common import check_update_fields


class UserBase(BaseModel):
    name: str
    username: str


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    password: Optional[str] = None
    is_admin: Optional[bool] = None
    is_approved: Optional[bool] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class User(UserBase):
    id: int
    hashed_password: str
    is_admin: bool
    is_approved: bool
    create_date: datetime

    class Config:
        from_attributes = True


class UserResponse(UserBase):
    id: int
    is_admin: bool
    is_approved: bool
    create_date: datetime


class UserLogin(BaseModel):
    username: str
    password: str
