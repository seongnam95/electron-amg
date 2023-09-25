from typing import List, Optional

from fastapi import HTTPException
from crud.base import CRUDBase
from models import Worker, Personal
from schemas import (
    WorkerCreate,
    WorkerUpdate,
    WorkerWithPersonal,
    PersonalResponse,
)
from sqlalchemy.orm import Session
from util.crypto import encrypt, decrypt, verify
from sqlalchemy.exc import IntegrityError
from util.image_converter import base64_to_image, image_to_base64


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    # 워커 생성 ( Personal 없을 때 )
    def create_worker(self, db: Session, worker_in: WorkerCreate):
        worker_dict = worker_in.model_dump()
        personal_dict = worker_dict.pop("personal", {})

        personal_obj = Personal(
            sign_base64=personal_dict["sign_base64"],
            bank=personal_dict["bank"],
            bank_num_enc=encrypt(personal_dict["bank_num"]),
            ssn_enc=encrypt(personal_dict["ssn"]),
            bank_book_file_nm=base64_to_image(personal_dict["bank_book"]),
            id_card_file_nm=base64_to_image(personal_dict["id_card"]),
        )

        try:
            db_obj = Worker(**worker_dict, personal=personal_obj)
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="")

    def get_worker_with_personal(self, db: Session, name: str, phone: str, ssn: str):
        worker = (
            db.query(Worker)
            .filter(Worker.name == name)
            .filter(Worker.phone == phone)
            .first()
        )

        if worker:
            personal: Personal = worker.personal
            if not verify(ssn, personal.ssn_enc):
                return None

            worker_dict = {
                c.key: getattr(worker, c.key) for c in Worker.__table__.columns
            }
            worker_dict["personal"] = self._decrypted_personal(personal)

        return worker_dict

    def get_worker_with_personal_for_params(
        self,
        db: Session,
        name: str,
        phone: str,
        ssn: str,
    ):
        worker = (
            db.query(Worker)
            .filter(Worker.name == name)
            .filter(Worker.phone == phone)
            .first()
        )

        if worker:
            personal: Personal = worker.personal
            if not verify(ssn, personal.ssn_enc):
                worker = None

        return worker

    def get_for_params(self, db: Session, *, name: str, phone: str, birth: str):
        return (
            db.query(Worker)
            .filter(Worker.name == name)
            .filter(Worker.phone == phone)
            .first()
        )

    def search(self, name: str, phone: str, db: Session):
        return (
            db.query(self.model)
            .filter(self.model.name == name, self.model.phone == phone)
            .first()
        )

    def _decrypted_personal(self, personal: Personal):
        bank_num_dec = decrypt(personal.bank_num_enc)
        return PersonalResponse(
            id=personal.id,
            worker_id=personal.worker_id,
            bank=personal.bank,
            bank_book=image_to_base64(personal.bank_book_file_nm),
            id_card=image_to_base64(personal.id_card_file_nm),
            bank_num_cover=bank_num_dec[:4]
            + "*" * (len(bank_num_dec) - 7)
            + bank_num_dec[-3:],
        ).model_dump()


worker = CRUDWorker(Worker)
