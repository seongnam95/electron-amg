from pydantic import BaseModel, model_validator
from typing import List, Optional
from datetime import datetime

from schemas.common import check_update_fields


class UserCreate(BaseModel):
    name: str
    username: str
    password: str
    is_admin: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_approved: Optional[bool] = None
    employee_id: Optional[str] = None


class UserUpdate(BaseModel):
    password: Optional[str] = None
    is_admin: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_approved: Optional[bool] = None
    employee_id: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class User(BaseModel):
    id: str
    name: str
    username: str
    hashed_password: str
    is_admin: bool
    is_superuser: bool
    is_approved: bool
    create_date: datetime

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: str
    username: str
    is_admin: bool
    is_approved: bool
    has_team: bool

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str
