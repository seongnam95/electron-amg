from pydantic import BaseModel, model_validator
from typing import Optional

from schemas.common import check_update_fields


class PersonalBase(BaseModel):
    bank: str
    sign_base64: str
    bank_num: str
    ssn: str
    bank_book: str
    id_card: str


class PersonalEncryptionBase(BaseModel):
    bank: str
    sign_base64: str
    bank_num_enc: str
    ssn_enc: str
    bank_book_file_nm: str
    id_card_file_nm: str


class PersonalCreate(PersonalBase):
    pass


class PersonalUpdate(BaseModel):
    bank: Optional[str] = None
    bank_num: Optional[str] = None
    sign_base64: Optional[str] = None
    ssn: Optional[str] = None
    bank_book: Optional[str] = None
    id_card: Optional[str] = None

    @model_validator(mode="before")
    def check_fields(cls, values: dict):
        return check_update_fields(cls, values)


class Personal(PersonalBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True


class PersonalEncryption(PersonalEncryptionBase):
    id: int
    worker_id: int

    class Config:
        from_attributes = True
