from crud.base import CRUDBase
from models import Position
from schemas import PositionCreate, PositionUpdate
from sqlalchemy.orm import Session


class CRUDPosition(CRUDBase[Position, PositionCreate, PositionUpdate]):
    def create_position(
        self, db: Session, *, obj_in: PositionCreate, team_id: int
    ) -> Position:
        position_dict = obj_in.model_dump()
        position_dict["team_id"] = team_id
        db_obj = Position(**position_dict)  # type: ignore

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


position = CRUDPosition(Position)
