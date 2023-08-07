from pydantic import BaseModel, validator
from typing import Optional


class PersonalBase(BaseModel):
    bank: str
    bank_number_enc: str
    ssn_enc: str
    sign_enc: str


class PersonalCreate(PersonalBase):
    pass


class PersonalUpdate(BaseModel):
    bank: Optional[str] = None
    bank_number_enc: Optional[str] = None
    sign_enc: Optional[str] = None

    @validator("*", pre=True, always=True)
    def check_update_fields(cls, v, values, **kwargs):
        if not values:
            raise ValueError("At least one field to update must be provided")
        return v


class Personal(PersonalBase):
    id: int

    class Config:
        from_attributes = True
