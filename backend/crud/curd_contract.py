from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Contract
from schemas import ContractCreate, ContractUpdate
from sqlalchemy.orm import Session


class CRUDContract(CRUDBase[Contract, ContractCreate, ContractUpdate]):
    def create_contract(
        self, worker_id: int, db: Session, *, obj_in: ContractCreate
    ) -> Contract:
        # 해당 Worker에 유효한 Contract가 있는지 확인
        existing_valid_contract = (
            db.query(Contract)
            .filter(Contract.worker_id == worker_id, Contract.valid == True)
            .first()
        )

        # 있다면 이전 Contract를 무효로 설정
        if existing_valid_contract:
            existing_valid_contract.valid = False
            db.commit()

        obj_in_data = obj_in.dict()
        obj_in_data["worker_id"] = worker_id
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


contract = CRUDContract(Contract)
