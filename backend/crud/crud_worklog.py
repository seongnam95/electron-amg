from datetime import datetime
from typing import List
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

from sqlalchemy import func
from crud.base import CRUDBase
from models import WorkLog
from schemas import WorkLogCreate, WorkLogUpdate
from sqlalchemy.orm import Session
from datetime import date


class CRUDWorkLog(CRUDBase[WorkLog, WorkLogCreate, WorkLogUpdate]):
    def create_worklog(
        self, db: Session, *, employee_id: int, worklog_in: WorkLogCreate
    ):
        today = date.today().strftime("%Y-%m-%d")  # 현재 날짜 가져오기
        working_date = worklog_in.working_date if worklog_in.working_date else today

        worklog = (
            db.query(WorkLog)
            .filter(WorkLog.employee_id == employee_id)
            .filter(WorkLog.working_date == working_date)
            .first()
        )

        if worklog:
            raise HTTPException(status_code=404, detail="이미 출근처리 되었습니다.")

        obj_in_data = jsonable_encoder(worklog_in)
        obj_in_data["employee_id"] = employee_id
        obj_in_data["working_date"] = working_date
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

    # 특정 날짜의 Worklog 전체 불러오기
    def get_all_worklog_by_date(
        self,
        date_str: str,
        db: Session,
    ) -> List[WorkLog]:
        return (
            db.query(self.model).filter(WorkLog.create_date.like(f"{date_str}%")).all()
        )


worklog = CRUDWorkLog(WorkLog)
