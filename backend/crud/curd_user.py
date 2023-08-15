from fastapi.encoders import jsonable_encoder
from util.bcrypt import get_password_hash
from crud.base import CRUDBase
from models import User
from schemas import UserCreate, UserUpdate
from sqlalchemy.orm import Session


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def create_user(self, *, db: Session, obj_in: UserCreate) -> User:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)

        hash_password = get_password_hash(obj_in.password)
        db_obj.hashed_password = hash_password

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return db_obj


user = CRUDUser(User)
