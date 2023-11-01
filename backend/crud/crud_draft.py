from datetime import datetime
import random
import string
from typing import List
from crud.base import CRUDBase
from models import Draft
from schemas import DraftCreate, DraftUpdate
from sqlalchemy.orm import Session


class CRUDDraft(CRUDBase[Draft, DraftCreate, DraftUpdate]):
    def get_multi_draft_by_team(self, *, db: Session, team_id: int) -> List[Draft]:
        return db.query(Draft).filter(Draft.team_id == team_id).all()

    def create_draft(
        self, *, db: Session, team_id: int, draft_in: DraftCreate
    ) -> Draft:
        # 랜덤 ID 생성 (중복 시, 재생성)
        while True:
            id_ = "".join(random.choices(string.ascii_letters + string.digits, k=4))
            if not db.query(Draft).filter_by(id=id_).first():
                break

        draft_in_data = draft_in.model_dump()
        draft_in_data["id"] = id_
        draft_in_data["team_id"] = team_id

        db_obj = Draft(**draft_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


draft = CRUDDraft(Draft)
