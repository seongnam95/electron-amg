from crud.base import CRUDBase
from models import Position, Unit
from schemas import PositionCreate, PositionUpdate
from sqlalchemy.orm import Session


class CRUDPosition(CRUDBase[Position, PositionCreate, PositionUpdate]):
    def create_position(
        self, db: Session, *, obj_in: PositionCreate, unit_obj: Unit
    ) -> Position:
        position_dict = obj_in.model_dump()
        position_dict["unit_id"] = unit_obj.id
        position_dict["team_id"] = unit_obj.team_id

        db_obj = Position(**position_dict)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj

    def remove_position(self, db: Session, *, position_id: str) -> Position:
        position = db.query(self.model).filter(self.model.id == position_id).first()

        if position:
            position.is_active = False
            db.commit()

        return position


position = CRUDPosition(Position)
