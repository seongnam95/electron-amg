from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime

from schemas.common import check_update_fields
from schemas.team import TeamResponse


class UserCreate(BaseModel):
    name: str
    username: str
    password: str
    is_admin: Optional[bool] = None
    is_approved: Optional[bool] = None


class UserUpdate(BaseModel):
    password: Optional[str] = None
    is_admin: Optional[bool] = None
    is_approved: Optional[bool] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class User(BaseModel):
    id: int
    name: str
    username: str
    hashed_password: str
    is_admin: bool
    is_approved: bool
    affiliation_id: int
    create_date: datetime

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    username: str
    is_admin: bool
    is_approved: bool
    team: Optional[TeamResponse]

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str
