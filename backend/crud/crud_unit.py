from crud.base import CRUDBase
from models import Unit
from schemas import UnitCreate, UnitUpdate
from sqlalchemy.orm import Session


class CRUDUnit(CRUDBase[Unit, UnitCreate, UnitUpdate]):
    pass


unit = CRUDUnit(Unit)
