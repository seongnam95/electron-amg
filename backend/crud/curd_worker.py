from typing import List, Optional

from fastapi import HTTPException
from crud.base import CRUDBase
from models import Worker, Group, Personal
from schemas import (
    WorkerCreate,
    WorkerUpdate,
    WorkerWithPersonal,
    Personal as PersonalSchema,
)
from sqlalchemy.orm import Session
from util.crypto import encrypt, decrypt
from sqlalchemy.exc import IntegrityError
from util.image_save import save_base64_image


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    def create_worker(self, db: Session, worker_in: WorkerCreate):
        worker_dict = worker_in.model_dump()
        personal_dict = worker_dict.pop("personal", {})

        personal_obj = Personal(
            sign_base64=personal_dict["sign_base64"],
            bank=personal_dict["bank"],
            bank_num_enc=encrypt(personal_dict["bank_num"]),
            ssn_enc=encrypt(personal_dict["ssn"]),
            bank_book_file_nm=save_base64_image(personal_dict["bank_book"]),
            id_card_file_nm=save_base64_image(personal_dict["id_card"]),
        )

        try:
            db_obj = Worker(**worker_dict, personal=personal_obj)
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="")

    def get_worker_with_personal(self, db: Session, id: int):
        worker: Worker = db.query(Worker).filter(Worker.id == id).first()

        if not worker:
            return

        worker_dict = {c.key: getattr(worker, c.key) for c in Worker.__table__.columns}

        personal: Personal = worker.personal
        decrypted_personal = PersonalSchema(
            id=personal.id,
            worker_id=personal.worker_id,
            bank=personal.bank,
            bank_book=personal.bank_book_file_nm,
            id_card=personal.id_card_file_nm,
            sign_base64=personal.sign_base64,
            bank_num=decrypt(personal.bank_num_enc),
            ssn=decrypt(personal.ssn_enc),
        ).model_dump()

        worker_dict["personal"] = decrypted_personal
        return worker_dict

    def get_for_params(self, db: Session, *, name: str, phone: str, birth: str):
        return (
            db.query(Worker)
            .filter(Worker.name == name)
            .filter(Worker.phone == phone)
            .first()
        )

    def get_multi_worker(
        self,
        db: Session,
        *,
        group_id: Optional[int] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> List[Worker]:
        if group_id:
            return (
                db.query(Worker)
                .filter(Worker.group_id == group_id)
                .offset(skip)
                .limit(limit)
                .all()
            )
        return db.query(self.model).offset(skip).limit(limit).all()

    def get_unaffiliated_worker(self, db: Session, *, skip: int = 0, limit: int = 100):
        return (
            db.query(Worker)
            .filter(Worker.group_id == None)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def change_group(self, db: Session, group_id: str, workers: List[int]):
        db.query(Worker).filter(Worker.id.in_(workers)).update(
            {Worker.group_id: group_id}, synchronize_session="fetch"
        )
        db.commit()
        return

    def create_worker_in_group(self, db: Session, *, obj_in: WorkerCreate) -> Worker:
        new_obj_in = obj_in.model_dump()

        if new_obj_in.get("group_id"):
            group_id = new_obj_in.get("group_id")
            group = db.query(Group).filter(Group.id == group_id).first()
            if not group:
                raise HTTPException(status_code=404, detail="해당하는 그룹을 찾을 수 없습니다.")

            new_obj_in["group"] = group

        new_worker = Worker(**new_obj_in)

        db.add(new_worker)
        db.commit()
        db.refresh(new_worker)
        return new_worker

    def search(self, name: str, phone: str, db: Session):
        return (
            db.query(self.model)
            .filter(self.model.name == name, self.model.phone == phone)
            .first()
        )


worker = CRUDWorker(Worker)
