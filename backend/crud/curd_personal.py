from crud.base import CRUDBase
from models import Personal
from schemas import PersonalCreate, PersonalUpdate
from sqlalchemy.orm import Session


class CRUDPersonal(CRUDBase[Personal, PersonalCreate, PersonalUpdate]):
    def create_personal(
        self, db: Session, *, obj_in: PersonalCreate, worker_id: int
    ) -> Personal:
        db.query(self.model).filter(self.model.id == id).first()

        obj_in_data = obj_in.model_dump()
        obj_in_data["worker_id"] = worker_id
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


personal = CRUDPersonal(Personal)
