from typing import List, Optional

from fastapi import HTTPException
from crud.base import CRUDBase
from models import Worker, Group
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session
from util.crypto import encrypt
from sqlalchemy.exc import IntegrityError


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    def create_worker(self, db: Session, worker_in: WorkerCreate):
        worker_obj = worker_in.model_dump()
        personal_obj = worker_obj.get("personal")

        # 암호화
        bank_num_enc = encrypt(personal_obj.get("bank_num"))
        ssn_enc = encrypt(personal_obj.get("ssn"))

        new_personal_obj = {
            **personal_obj,
            "bank_num_enc": bank_num_enc,
            "ssn_enc": ssn_enc,
        }
        print(new_personal_obj)
        db_obj = Worker(personal=new_personal_obj, **worker_obj)

        try:
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="")

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
