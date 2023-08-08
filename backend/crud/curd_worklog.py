from datetime import datetime
from typing import List

from sqlalchemy import func
from crud.base import CRUDBase
from models import WorkLog
from schemas import WorkLogCreate, WorkLogUpdate
from sqlalchemy.orm import Session


class CRUDWorkLog(CRUDBase[WorkLog, WorkLogCreate, WorkLogUpdate]):
    # 특정 Worker, 특정 날짜의 Worklog 불러오기
    def get_worklog_for_worker_by_date(
        self,
        worker_id: int,
        date_str: str,
        db: Session,
    ) -> WorkLog:
        return (
            db.query(self.model)
            .filter(self.model.worker_id == worker_id)
            .filter(self.model.working_date_str == date_str)
            .first()
        )

    # 특정 날짜의 Worklog 전체 불러오기
    def get_all_worklog_by_date(
        self,
        date_str: str,
        db: Session,
    ) -> List[WorkLog]:
        return (
            db.query(self.model).filter(self.model.working_date_str == date_str).all()
        )


worklog = CRUDWorkLog(WorkLog)
