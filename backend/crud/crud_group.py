from typing import List
from crud.base import CRUDBase
from models import Group, Worker
from schemas import GroupCreate, GroupUpdate
from sqlalchemy.orm import Session


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    # 그룹의 모든 근로자 GET
    def get_group_workers(
        self,
        group_id: int,
        db: Session,
    ) -> List[Worker]:
        return db.query(Worker).filter(Worker.group_id == group_id).all()


group = CRUDGroup(Group)
