from crud.base import CRUDBase
from models import Personal
from schemas import PersonalCreate, PersonalUpdate


class CRUDPersonal(CRUDBase[Personal, PersonalCreate, PersonalUpdate]):
    pass


personal = CRUDPersonal(Personal)
