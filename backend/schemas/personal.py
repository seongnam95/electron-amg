from pydantic import BaseModel, model_validator
from typing import Optional

from schemas.common import check_update_fields


class PersonalBase(BaseModel):
    bank: str
    bank_number_enc: str
    ssn_enc: str
    sign_base64: str


class PersonalCreate(PersonalBase):
    pass


class PersonalUpdate(BaseModel):
    bank: Optional[str] = None
    bank_number_enc: Optional[str] = None
    sign_base64: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Personal(PersonalBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True
