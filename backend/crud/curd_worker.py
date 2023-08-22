from typing import List, Type
from crud.base import CRUDBase
from models import Worker
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    def search(self, name: str, phone: str, db: Session):
        return (
            db.query(self.model)
            .filter(self.model.name == name, self.model.phone == phone)
            .first()
        )


worker = CRUDWorker(Worker)
