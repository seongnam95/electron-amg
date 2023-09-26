from typing import List, Optional

from fastapi import HTTPException
from crud.base import CRUDBase
from models import Worker
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session
from util.crypto import encrypt, decrypt, verify
from sqlalchemy.exc import IntegrityError
from util.image_converter import base64_to_image, image_to_base64


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    # 워커 생성 ( Personal 없을 때 )
    def create_worker(self, db: Session, worker_in: WorkerCreate) -> Optional[Worker]:
        ssn_enc = encrypt(worker_in.ssn)
        bank_num_enc = encrypt(worker_in.bank_num)
        bank_book_file_nm = base64_to_image(worker_in.bank_book)
        id_card_file_nm = base64_to_image(worker_in.id_card)

        worker_obj = Worker(
            name=worker_in.name,
            phone=worker_in.phone,
            residence=worker_in.residence,
            gender_code=worker_in.gender_code,
            bank=worker_in.bank,
            ssn_enc=ssn_enc,
            bank_num_enc=bank_num_enc,
            bank_book_file_nm=bank_book_file_nm,
            id_card_file_nm=id_card_file_nm,
        )

        db.add(worker_obj)
        db.commit()
        db.refresh(worker_obj)

        return worker_obj

    def get_worker_for_data(self, db: Session, name: str, ssn: str) -> Optional[Worker]:
        worker = db.query(Worker).filter(Worker.name == name).first()

        if worker:
            if verify(ssn, worker.ssn_enc):
                return worker

    def get_worker_search(self, db: Session, name: str, ssn: str) -> Optional[Worker]:
        workers = db.query(Worker).filter(Worker.name == name).all()

        if workers:
            for worker in workers:
                if verify(ssn, worker.ssn_enc):
                    return worker

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

        # if worker:
        #     personal: Personal = worker.personal
        #     if not verify(ssn, personal.ssn_enc):
        #         worker = None

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

    # def _decrypted_personal(self, personal: Personal):
    #     bank_num_dec = decrypt(personal.bank_num_enc)
    #     return PersonalResponse(
    #         id=personal.id,
    #         worker_id=personal.worker_id,
    #         bank=personal.bank,
    #         bank_book=image_to_base64(personal.bank_book_file_nm),
    #         id_card=image_to_base64(personal.id_card_file_nm),
    #         bank_num_cover=bank_num_dec[:4]
    #         + "*" * (len(bank_num_dec) - 7)
    #         + bank_num_dec[-3:],
    #     ).model_dump()


worker = CRUDWorker(Worker)
