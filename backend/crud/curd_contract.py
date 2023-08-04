from crud.base import CRUDBase
from models import Contract
from schemas import ContractCreate, ContractUpdate


class CRUDContract(CRUDBase[Contract, ContractCreate, ContractUpdate]):
    pass


contract = CRUDContract(Contract)
