from typing import List, Type
from crud.base import CRUDBase
from models import Worker
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    # 근로자의 모든 관련 데이터 (계약서, 근무로그 등) GET
    def get_worker_child_all(
        self,
        worker_id: int,
        model: Type,
        db: Session,
    ) -> List:
        return db.query(model).filter(model.worker_id == worker_id).all()


worker = CRUDWorker(Worker)
