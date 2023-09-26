from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Personal
from schemas import PersonalCreate, PersonalUpdate, Personal as PersonalSchema
from sqlalchemy.orm import Session
from typing import Any, Dict, Union
from util.crypto import encrypt, decrypt
from util.image_converter import base64_to_image, image_to_base64


class CRUDPersonal(CRUDBase[Personal, PersonalCreate, PersonalUpdate]):
    def get_personal(self, db: Session, *, worker_id: Any):
        return db.query(Personal).filter(Personal.worker_id == worker_id).first()

    def get_decryption_personal(self, db: Session, *, worker_id: Any):
        personal = db.query(Personal).filter(Personal.worker_id == worker_id).first()

        personal_obj = PersonalSchema(
            id=personal.id,
            worker_id=personal.worker_id,
            bank=personal.bank,
            bank_book=personal.bank_book_file_nm,
            id_card=personal.id_card_file_nm,
            ssn=decrypt(personal.ssn_enc),
            bank_num=decrypt(personal.bank_num_enc),
        )

        return Personal(**personal_obj.model_dump())


personal = CRUDPersonal(Personal)
