from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
from ... import deps

router = APIRouter()


@router.delete("/team")
def delete_all_data(db: Session = Depends(deps.get_db)):
    db.query(models.Employee).delete()
    db.query(models.Attendance).delete()
    db.query(models.Draft).delete()
    db.commit()
