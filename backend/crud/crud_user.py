from fastapi import HTTPException

from util.bcrypt import pwd_context
from crud.base import CRUDBase
from models import User
from schemas import UserCreate, UserUpdate
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import crud


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def validation_user(self, *, db: Session, user: User):
        if not user.is_superuser:
            team_count = (
                db.query(User).filter(User.id == user.id).filter(User.teams).count()
            )
            has_team = True if team_count > 0 else False

            if not user.is_approved:
                raise HTTPException(status_code=401, detail="비활성화 된 계정입니다.")
            elif not has_team:
                raise HTTPException(status_code=401, detail="팀이 할당되지 않았습니다.")

    def get_user(self, *, db: Session, username: str) -> User:
        return db.query(self.model).filter(User.username == username).first()

    def create_user(self, *, db: Session, obj_in: UserCreate) -> User:
        obj_in_data = {k: v for k, v in obj_in.model_dump().items() if k != "password"}
        db_obj = User(**obj_in_data)

        hash_password = pwd_context.hash(obj_in.password)
        db_obj.hashed_password = hash_password

        try:
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="이미 사용중인 계정입니다.")

        return db_obj


user = CRUDUser(User)
