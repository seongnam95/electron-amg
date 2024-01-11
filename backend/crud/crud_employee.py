from typing import Optional
from datetime import date
from enum import Enum
from crud.base import CRUDBase
from models import Employee
from schemas import EmployeeCreate, EmployeeUpdate
from sqlalchemy.orm import Session
from util.crypto import encrypt, verify
from util.image_converter import base64_to_image, remove_image


class CRUDEmployee(CRUDBase[Employee, EmployeeCreate, EmployeeUpdate]):
    # 필드 암호화 및 이미지 저장
    def _encrypt_employee(self, employee_in: EmployeeCreate | EmployeeUpdate) -> dict:
        employee_dict = employee_in.model_dump(exclude_unset=True)
        print(employee_dict)

        for field in list(employee_dict.keys()):
            if field in ["ssn", "bank_num"]:
                is_empty = employee_dict[field].strip() == ""
                employee_dict[f"{field}_enc"] = (
                    "" if is_empty else encrypt(employee_dict[field])
                )
                employee_dict.pop(field)

            elif field in ["bank_book", "id_card"]:
                is_empty = employee_dict[field].strip() == ""
                employee_dict[f"{field}_file_nm"] = (
                    "" if is_empty else base64_to_image(employee_dict[field])
                )
                employee_dict.pop(field)

        return employee_dict

    # 근무자 생성
    def create_employee(
        self, db: Session, team_id: str, employee_in: EmployeeCreate
    ) -> Employee:
        employee_dict_enc = self._encrypt_employee(employee_in)

        employee_obj = Employee(**employee_dict_enc, team_id=team_id)

        db.add(employee_obj)
        db.commit()
        db.refresh(employee_obj)

        return employee_obj

    # ? 근무자 업데이트
    def update_employee(
        self, db: Session, employee_obj: Employee, employee_in: EmployeeUpdate
    ) -> Employee:
        update_data = self._encrypt_employee(employee_in)

        for field in update_data.keys():
            setattr(employee_obj, field, update_data[field])

        db.add(employee_obj)
        db.commit()
        db.refresh(employee_obj)

        return employee_obj

    # 근무자 삭제
    def remove_employee(self, db: Session, *, employee_obj: Employee):
        remove_image(employee_obj.bank_book_file_nm)
        remove_image(employee_obj.id_card_file_nm)

        db.delete(employee_obj)
        db.commit()

    # 근무자 검색 [이름, 주민등록번호]
    def get_employee_search(
        self, db: Session, name: str, ssn: str
    ) -> Optional[Employee]:
        employees = db.query(Employee).filter(Employee.name == name).all()

        for employee in employees:
            if verify(ssn, employee.ssn_enc):
                return employee

        return None

    def get_multi_employee(
        self,
        db: Session,
        *,
        team_id: str,
        valid: Optional[bool],
        offset: int,
        limit: int,
    ):
        today = date.today()
        base_query = db.query(Employee).filter(Employee.team_id == team_id)

        if valid is True:
            base_query = base_query.filter(
                Employee.start_period <= today, Employee.end_period >= today
            )
        elif valid is False:
            base_query = base_query.filter(Employee.end_period < today)

        employees = base_query.offset(offset).limit(limit).all()
        return employees


employee = CRUDEmployee(Employee)
