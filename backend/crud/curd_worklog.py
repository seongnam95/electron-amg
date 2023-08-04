from datetime import datetime
from crud.base import CRUDBase
from models import WorkLog
from schemas import WorkLogCreate, WorkLogUpdate
from typing import List, Optional
from sqlalchemy.orm import Session


class CRUDWorkLog(CRUDBase[WorkLog, WorkLogCreate, WorkLogUpdate]):
    def get_worker_worklog(
        self, db: Session, worker_id: int, working_date: Optional[datetime] = None
    ) -> List[WorkLog]:
        query = db.query(self.model).filter(self.model.worker_id == worker_id)

        if working_date is not None:
            query = query.filter(self.model.working_date == working_date)

        return query.all()


worklog = CRUDWorkLog(WorkLog)
