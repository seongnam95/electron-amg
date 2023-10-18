from models.employee import Employee
from crud.base import CRUDBase
from models import Contract
from schemas import ContractCreate, ContractUpdate, EmployeeContractModel
from sqlalchemy.orm import Session
from typing import List, Any, Optional


class CRUDContract(CRUDBase[Contract, ContractCreate, ContractUpdate]):
    def get_all_contract_for_employee(
        self, db: Session, *, employee_obj: Employee, skip: int = 0, limit: int = 100
    ) -> List[Contract]:
        for c in employee_obj.contracts:
            print(c)

        return db.query(Contract).offset(skip).limit(limit).all()

    def get_employee_contract(
        self, db: Session, *, employee_id: str
    ) -> EmployeeContractModel:
        contracts = db.query(Contract).filter(Contract.employee_id == employee_id).all()
        if not contracts:
            return []

        valid_contract = None
        prev_contracts = []
        for contract in contracts:
            if contract.valid:
                valid_contract = contract
            else:
                prev_contracts.append(contract)

        return EmployeeContractModel(
            valid_contract=valid_contract,
            prev_contract_count=len(prev_contracts),
            prev_contracts=prev_contracts,
        )

    # 계약서 생성
    def create_contract(
        self, db: Session, *, employee_id: int, contract_obj: ContractCreate
    ) -> Contract:
        # 해당 Employee에 유효한 Contract가 있는지 확인
        existing_valid_contracts = (
            db.query(Contract)
            .filter(Contract.employee_id == employee_id, Contract.valid == True)
            .all()
        )

        # 있다면 기존 Contract를 무효로 설정
        for contract in existing_valid_contracts:
            contract.valid = False
            db.commit()

        contract_dict = contract_obj.model_dump()
        contract_dict["employee_id"] = employee_id
        contract_obj = Contract(**contract_dict)

        db.add(contract_obj)
        db.commit()
        db.refresh(contract_obj)


contract = CRUDContract(Contract)
