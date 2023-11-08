from datetime import datetime
from typing import List
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

from sqlalchemy import func
from crud.base import CRUDBase
from models import Attendance
from schemas import AttendanceCreate, AttendanceUpdate
from sqlalchemy.orm import Session
from datetime import date


class CRUDAttendance(CRUDBase[Attendance, AttendanceCreate, AttendanceUpdate]):
    def create_attendance(
        self, db: Session, *, employee_id: str, attendance_in: AttendanceCreate
    ):
        today = date.today().strftime("%Y-%m-%d")  # 현재 날짜 가져오기
        working_date = (
            attendance_in.working_date if attendance_in.working_date else today
        )

        attendance = (
            db.query(Attendance)
            .filter(Attendance.employee_id == employee_id)
            .filter(Attendance.working_date == working_date)
            .first()
        )

        if attendance:
            raise HTTPException(status_code=404, detail="이미 출근처리 되었습니다.")

        obj_in_data = jsonable_encoder(attendance_in)
        obj_in_data["employee_id"] = employee_id
        obj_in_data["working_date"] = working_date
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

    # 특정 날짜의 Attendance 전체 불러오기
    def get_all_attendance_by_date(
        self,
        date_str: str,
        db: Session,
    ) -> List[Attendance]:
        return (
            db.query(self.model)
            .filter(Attendance.create_date.like(f"{date_str}%"))
            .all()
        )


attendance = CRUDAttendance(Attendance)
