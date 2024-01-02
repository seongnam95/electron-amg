from typing import List
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Attendance, Employee, Position
from schemas import AttendanceCreate, AttendanceUpdate
from sqlalchemy.orm import Session
from datetime import date


class CRUDAttendance(CRUDBase[Attendance, AttendanceCreate, AttendanceUpdate]):
    def create_attendance(
        self,
        db: Session,
        *,
        employee: Employee,
        attendance_in: AttendanceCreate,
    ):
        today = date.today().strftime("%y-%m-%d")
        working_date = (
            attendance_in.working_date if attendance_in.working_date else today
        )

        # 해당 날짜의 Attendance 조회
        attendance = (
            db.query(Attendance)
            .filter(Attendance.employee_id == employee.id)
            .filter(Attendance.working_date == working_date)
            .first()
        )

        if attendance:
            raise HTTPException(status_code=404, detail="이미 출근처리 되었습니다.")

        if attendance_in.position_id and attendance_in.position_id != "default":
            position: Position = db.query(Position).get(attendance_in.position_id)
            if not position:
                raise HTTPException(status_code=404, detail="Position not found")
        else:
            position: Position = employee.position

        obj_in_data = jsonable_encoder(attendance_in)
        obj_in_data["working_date"] = working_date
        obj_in_data["employee_id"] = employee.id
        obj_in_data["position_id"] = position.id
        obj_in_data["earns_incentive"] = position.default_earns_incentive
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

    def update_attendance(
        self,
        db: Session,
        *,
        attendance_obj: Attendance,
        attendance_in: AttendanceUpdate,
    ):
        update_data = attendance_in.model_dump(exclude_unset=True)

        if attendance_in.position_id and attendance_in.position_id != "default":
            position = db.query(Position).get(attendance_in.position_id)
            if not position:
                raise HTTPException(status_code=404, detail="Position not found")
        else:
            position = attendance_obj.employee.position

        update_data["position_id"] = position.id
        update_data["earns_incentive"] = position.default_earns_incentive

        for field, value in update_data.items():
            setattr(attendance_obj, field, value)

        db.add(attendance_obj)
        db.commit()
        db.refresh(attendance_obj)
        return attendance_obj

    # 특정 날짜의 Attendance 전체 불러오기
    def get_all_attendance_by_month(
        self,
        db: Session,
        *,
        employee_id: str,
        day_str: str,
    ) -> List[Attendance]:
        return (
            db.query(Attendance)
            .filter(Attendance.employee_id == employee_id)
            .filter(Attendance.working_date.startswith(day_str))
            .all()
        )


attendance = CRUDAttendance(Attendance)
