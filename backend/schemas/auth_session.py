from pydantic import BaseModel, model_validator
from typing import Optional
from datetime import datetime

from schemas.common import check_update_fields


class AuthSessionBase(BaseModel):
    session_id: str
    last_access_ip: str


class AuthSessionCreate(AuthSessionBase):
    pass


class AuthSessionUpdate(BaseModel):
    last_access_ip: Optional[str] = None
    expiry_date: Optional[datetime] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class AuthSession(AuthSessionBase):
    id: int
    user_id: int
    create_date: datetime
    expiry_date: datetime

    class Config:
        from_attributes = True
