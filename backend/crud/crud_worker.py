from typing import List, Optional

from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Worker
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session
from util.crypto import encrypt, decrypt, verify
from sqlalchemy.exc import IntegrityError
from util.image_converter import base64_to_image, image_to_base64


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    def _encrypt_worker(
        self, worker_in: WorkerCreate | WorkerUpdate
    ) -> Optional[Worker]:
        ssn_enc = encrypt(worker_in.ssn)
        bank_num_enc = encrypt(worker_in.bank_num)
        bank_book_file_nm = base64_to_image(worker_in.bank_book)
        id_card_file_nm = base64_to_image(worker_in.id_card)

        return Worker(
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

    # 근로자 생성
    def create_worker(self, db: Session, worker_in: WorkerCreate) -> Optional[Worker]:
        worker_obj = self._encrypt_worker(worker_in)

        db.add(worker_obj)
        db.commit()
        db.refresh(worker_obj)

        return worker_obj

    def update_worker(
        self, db: Session, worker_obj: Worker, worker_in: WorkerUpdate
    ) -> Optional[Worker]:
        obj_data = jsonable_encoder(worker_obj)

        if isinstance(worker_in, dict):
            update_data = self._encrypt_worker(worker_in)
        else:
            update_data = self._encrypt_worker(worker_in.model_dump(exclude_unset=True))

        for field in obj_data:
            if field in update_data:
                setattr(worker_obj, field, update_data[field])

        db.add(worker_obj)
        db.commit()
        db.refresh(worker_obj)

    # 근로자 검색
    def get_worker_search(self, db: Session, name: str, ssn: str) -> Optional[Worker]:
        workers = db.query(Worker).filter(Worker.name == name).all()

        for worker in workers:
            if verify(ssn, worker.ssn_enc):
                return worker

        return None


worker = CRUDWorker(Worker)
