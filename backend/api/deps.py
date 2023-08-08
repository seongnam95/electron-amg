from typing import Generator

from db.session import SessionLocal
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
import crud, schemas


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_worker(worker_id: int, db: Session = Depends(get_db)) -> schemas.Worker:
    worker = crud.worker.get(db=db, id=worker_id)

    if not worker:
        raise HTTPException(status_code=404, detail="worker not found")

    return worker
