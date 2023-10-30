from crud.base import CRUDBase
from models import Draft
from schemas import DraftCreate, DraftUpdate
from sqlalchemy.orm import Session


class CRUDDraft(CRUDBase[Draft, DraftCreate, DraftUpdate]):
    def create_draft(self, *, db: Session, user_id: int, obj_in: DraftCreate) -> Draft:
        draft_dic = obj_in.model_dump()
        draft_dic["user_id"] = user_id
        db_obj = self.model(**draft_dic)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


draft = CRUDDraft(Draft)
