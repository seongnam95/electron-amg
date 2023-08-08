from crud.base import CRUDBase
from models import Personal
from schemas import PersonalCreate, PersonalUpdate
from sqlalchemy.orm import Session


class CRUDPersonal(CRUDBase[Personal, PersonalCreate, PersonalUpdate]):
    pass


personal = CRUDPersonal(Personal)
