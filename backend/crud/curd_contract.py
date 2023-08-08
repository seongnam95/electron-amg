from crud.base import CRUDBase
from models import Contract
from schemas import ContractCreate, ContractUpdate
from sqlalchemy.orm import Session


class CRUDContract(CRUDBase[Contract, ContractCreate, ContractUpdate]):
    def create_contract(
        self, worker_id: int, db: Session, *, obj_in: ContractCreate
    ) -> Contract:
        # 해당 Worker에 유효한 Contract가 있는지 확인
        existing_valid_contracts = (
            db.query(self.model)
            .filter(self.model.worker_id == worker_id, self.model.valid == True)
            .all()
        )

        # 있다면 기존 Contract를 무효로 설정
        for contract in existing_valid_contracts:
            contract.valid = False
            db.commit()

        obj_in_data = obj_in.model_dump()
        obj_in_data["worker_id"] = worker_id
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


contract = CRUDContract(Contract)
