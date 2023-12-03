from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models, schemas
from ... import deps

router = APIRouter()


@router.delete("/team")
def delete_all_data(db: Session = Depends(deps.get_db)):
    db.query(models.Employee).delete()
    db.query(models.Attendance).delete()
    db.query(models.Draft).delete()
    db.commit()


@router.post("/init")
def init_data(db: Session = Depends(deps.get_db)):
    user = db.query(models.User).filter(models.User.username == "test").first()
    if not user:
        schemas.UserCreate()

    print(user)
