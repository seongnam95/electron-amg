from typing import List
from fastapi import HTTPException

from fastapi.encoders import jsonable_encoder
from crud.base import CRUDBase
from models import Group, Worker, User
from schemas import GroupCreate, GroupUpdate
from sqlalchemy.orm import Session


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def create_group(self, db: Session, *, obj_in: GroupCreate) -> Group:
        new_obj_in = obj_in.model_dump()

        print(new_obj_in)
        if new_obj_in.get("user_id"):
            user_id = new_obj_in.get("user_id")
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            new_obj_in["user"] = user

        new_group = Group(**new_obj_in)

        db.add(new_group)
        db.commit()
        db.refresh(new_group)
        return new_group

    # 그룹의 모든 근로자 GET
    def get_group_workers(
        self,
        group_id: int,
        db: Session,
    ) -> List[Worker]:
        return db.query(Worker).filter(Worker.group_id == group_id).all()


group = CRUDGroup(Group)
