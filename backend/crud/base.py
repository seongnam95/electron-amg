from typing import Any, Dict, List, Generic, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from db.base import Base

from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import Employee

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def get(self, db: Session, *, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def get_multi_by_user(
        self, db: Session, *, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return (
            db.query(self.model)
            .filter(self.model.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]],
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)

        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> ModelType:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj

    # For Employee

    def get_for_worker(
        self,
        db: Session,
        *,
        worker_id: Any,
    ) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.worker_id == worker_id).first()

    def get_multi_for_worker(
        self, db: Session, *, worker_id: Any, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return (
            db.query(self.model)
            .filter(self.model.worker_id == worker_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create_for_worker(
        self, db: Session, *, obj_in: CreateSchemaType, worker_id: int
    ) -> ModelType:
        obj_in_data = obj_in.model_dump()
        obj_in_data["worker_id"] = worker_id
        db_obj = self.model(**obj_in_data)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
