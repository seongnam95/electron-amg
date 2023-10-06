from typing import Optional

from crud.base import CRUDBase
from models import Employee
from schemas import WorkerCreate, WorkerUpdate
from sqlalchemy.orm import Session
from util.crypto import encrypt, verify
from util.image_converter import base64_to_image, remove_image


class CRUDWorker(CRUDBase[Employee, WorkerCreate, WorkerUpdate]):
    # 필드 암호화 및 이미지 저장
    def _encrypt_worker(self, worker_in: WorkerCreate | WorkerUpdate) -> dict:
        worker_dict = worker_in.model_dump(exclude_unset=True)

        for field in list(worker_dict.keys()):
            if field in ["ssn", "bank_num"]:
                worker_dict[f"{field}_enc"] = encrypt(worker_dict.pop(field))

            elif field in ["bank_book", "id_card"]:
                worker_dict[f"{field}_file_nm"] = base64_to_image(
                    worker_dict.pop(field)
                )

        return worker_dict

    # 근로자 생성
    def create_worker(self, db: Session, worker_in: WorkerCreate) -> Employee:
        worker_enc_dict = self._encrypt_worker(worker_in)
        worker_obj = Employee(**worker_enc_dict)

        db.add(worker_obj)
        db.commit()
        db.refresh(worker_obj)

        return worker_obj

    # 근로자 업데이트
    def update_worker(
        self, db: Session, worker_obj: Employee, worker_in: WorkerUpdate
    ) -> Employee:
        update_data = self._encrypt_worker(worker_in)

        for field in update_data.keys():
            setattr(worker_obj, field, update_data[field])

        db.add(worker_obj)
        db.commit()
        db.refresh(worker_obj)

        return worker_obj

    # 근로자 삭제
    def remove_worker(self, db: Session, *, id: int):
        worker_obj: Employee = db.query(Employee).get(id)

        remove_image(worker_obj.bank_book_file_nm)
        remove_image(worker_obj.id_card_file_nm)

        db.delete(worker_obj)
        db.commit()

    # 근로자 검색
    def get_worker_search(self, db: Session, name: str, ssn: str) -> Optional[Employee]:
        workers = db.query(Employee).filter(Employee.name == name).all()

        for employee in workers:
            if verify(ssn, employee.ssn_enc):
                return employee

        return None


employee = CRUDWorker(Employee)
