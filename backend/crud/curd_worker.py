from crud.base import CRUDBase
from models import Worker
from schemas import WorkerCreate, WorkerUpdate


class CRUDWorker(CRUDBase[Worker, WorkerCreate, WorkerUpdate]):
    pass


worker = CRUDWorker(Worker)
