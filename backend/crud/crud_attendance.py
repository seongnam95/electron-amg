from typing import List
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Attendance, Employee
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

        # 수당 계산 [단가 - 공제 (+ 식대)]
        pay = employee.position.standard_pay
        pay -= attendance_in.deduct if attendance_in.deduct else 0
        pay += (
            attendance.employee.team.meal_cost if attendance_in.is_meal_included else 0
        )

        obj_in_data = jsonable_encoder(attendance_in)
        obj_in_data["employee_id"] = employee.id
        obj_in_data["working_date"] = working_date
        obj_in_data["pay"] = pay
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

    # 특정 날짜의 Attendance 전체 불러오기
    def get_all_attendance_by_month(
        self,
        db: Session,
        *,
        employee_id: str,
        date_str: str,
    ) -> List[Attendance]:
        return (
            db.query(Attendance)
            .filter(Attendance.employee_id == employee_id)
            .filter(Attendance.working_date.startswith(date_str))
            .all()
        )

    # Attendance 업데이트
    def update_attendance(
        self, db: Session, attendance: Attendance, attendance_in: AttendanceUpdate
    ):
        update_data = attendance_in.model_dump(exclude_unset=True)

        attendance.pay = (
            attendance.employee.position.standard_pay
            + update_data.get("incentive", attendance.incentive)
            - update_data.get("deduct", attendance.deduct)
        )

        meal_cost = attendance.employee.team.meal_cost
        if update_data.get("is_meal_included", attendance.is_meal_included):
            attendance.pay += meal_cost

        for field, value in update_data.items():
            if field != "pay":
                setattr(attendance, field, value)

        db.add(attendance)
        db.commit()
        db.refresh(attendance)
        return attendance


attendance = CRUDAttendance(Attendance)
