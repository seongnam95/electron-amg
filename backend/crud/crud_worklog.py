from datetime import datetime
from typing import List

from sqlalchemy import func
from crud.base import CRUDBase
from models import WorkLog
from schemas import WorkLogCreate, WorkLogUpdate
from sqlalchemy.orm import Session


class CRUDWorkLog(CRUDBase[WorkLog, WorkLogCreate, WorkLogUpdate]):
    # 특정 Employee, 특정 날짜의 Worklog 불러오기
    def get_worklog_for_employee_by_date(
        self,
        employee_id: int,
        date_str: str,
        db: Session,
    ) -> WorkLog:
        return (
            db.query(self.model)
            .filter(self.model.employee_id == employee_id)
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
