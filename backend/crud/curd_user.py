from fastapi import Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from util.bcrypt import pwd_context
from crud.base import CRUDBase
from models import User
from schemas import UserCreate, UserUpdate, UserLogin
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_user(self, *, db: Session, username: str) -> User:
        return db.query(User).filter(User.username == username).first()

    def create_user(self, *, db: Session, obj_in: UserCreate) -> User:
        obj_in_data = {k: v for k, v in obj_in.dict().items() if k != "password"}
        db_obj = User(**obj_in_data)

        hash_password = pwd_context.hash(obj_in.password)
        db_obj.hashed_password = hash_password

        try:
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="이미 사용중인 아이디입니다.")

        return db_obj


user = CRUDUser(User)
