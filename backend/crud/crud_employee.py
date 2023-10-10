from typing import List, Optional
from datetime import date

from crud.base import CRUDBase
from models import Employee, Contract, WorkLog
from schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    ContractResponse,
    EmployeeWithContract,
)
from sqlalchemy.orm import Session, joinedload, selectinload
from util.crypto import encrypt, verify
from util.image_converter import base64_to_image, remove_image


class CRUDEmployee(CRUDBase[Employee, EmployeeCreate, EmployeeUpdate]):
    # 필드 암호화 및 이미지 저장
    def _encrypt_employee(self, employee_in: EmployeeCreate | EmployeeUpdate) -> dict:
        employee_dict = employee_in.model_dump(exclude_unset=True)

        for field in list(employee_dict.keys()):
            if field in ["ssn", "bank_num"]:
                employee_dict[f"{field}_enc"] = encrypt(employee_dict.pop(field))

            elif field in ["bank_book", "id_card"]:
                employee_dict[f"{field}_file_nm"] = base64_to_image(
                    employee_dict.pop(field)
                )

        return employee_dict

    # 근로자 생성
    def create_employee(self, db: Session, employee_in: EmployeeCreate) -> Employee:
        employee_enc_dict = self._encrypt_employee(employee_in)
        employee_obj = Employee(**employee_enc_dict)

        db.add(employee_obj)
        db.commit()
        db.refresh(employee_obj)

        return employee_obj

    # 근로자 업데이트
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

    # 근로자 삭제
    def remove_employee(self, db: Session, *, id: int):
        employee_obj: Employee = db.query(Employee).get(id)

        remove_image(employee_obj.bank_book_file_nm)
        remove_image(employee_obj.id_card_file_nm)

        db.delete(employee_obj)
        db.commit()

    # 근로자 검색
    def get_employee_search(
        self, db: Session, name: str, ssn: str
    ) -> Optional[Employee]:
        employees = db.query(Employee).filter(Employee.name == name).all()

        for employee in employees:
            if verify(ssn, employee.ssn_enc):
                return employee

        return None

    def get_employee_count(self, db: Session):
        return db.query(Employee).count()

    def get_all_employee(self, db: Session, *, offset: int, limit: int):
        today = date.today().strftime("%Y-%m-%d")
        employees = (
            db.query(Employee)
            .options(selectinload(Employee.contracts.and_(Contract.valid == True)))
            .options(
                selectinload(Employee.worklogs.and_(WorkLog.working_date == today))
            )
            .offset(offset)
            .limit(limit)
            .all()
        )

        new_employees = []
        for employee in employees:
            employee_obj = EmployeeWithContract(
                id=employee.id,
                name=employee.name,
                phone=employee.phone,
                gender_code=employee.gender_code,
                residence=employee.residence,
                create_date=employee.create_date,
                contract=employee.contracts[0] if employee.contracts else None,
                worklog=employee.worklogs[0] if employee.worklogs else None,
            )
            new_employees.append(employee_obj)

        return new_employees


employee = CRUDEmployee(Employee)
