from typing import Any, List, Optional

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas


router = APIRouter()


# 전체 로그 조회
@router.get("/", response_model=List[schemas.WorkLog])
def read_all_worklog(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    worklogs = crud.worklog.get_multi(db, skip=skip, limit=limit)
    return worklogs


# WorkLog ID로 조회
@router.get("/{worklog_id}", response_model=schemas.WorkLog)
def read_worklog(db: Session = Depends(deps.get_db), id=int):
    worklog = crud.worklog.get(db=db, id=id)

    if not worklog:
        raise HTTPException(status_code=404, detail="worklog not found")

    return worklog


# 해당하는 근무자(Worker) ID로 조회
# @router.get("/{worker_id}", response_model=schemas.WorkLog)
# def read_worker_worklog(
#     db: Session = Depends(deps.get_db), worker_id=int, working_date=Optional[str]
# ):
#     worklogs = crud.worklog.get_worker_worklog(
#         db=db, worker_id=worker_id, working_date=working_date
#     )

#     return worklogs


# 출, 퇴근 로그 생성
@router.post("/", response_model=schemas.WorkLog)
def create_worklog(
    *, db: Session = Depends(deps.get_db), worklog_in: schemas.WorkLogCreate
):
    worklog = crud.worklog.create(db=db, obj_in=worklog_in)
    return worklog


# 출, 퇴근 업데이트
@router.put("/{worklog_id}", response_model=schemas.WorkLog)
def update_worklog(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    worklog_in: schemas.WorkLogUpdate,
) -> Any:
    worklog = crud.worklog.get(db=db, id=id)

    if not worklog:
        raise HTTPException(status_code=404, detail="worklog not found")

    worklog = crud.worklog.update(db=db, db_obj=worklog, obj_in=worklog_in)
    return worklog


# 출, 퇴근 로그 삭제
@router.delete("/{worklog_id}", response_model=schemas.WorkLog)
def delete_worklog(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    worklog = crud.worklog.get(db=db, id=id)

    if not worklog:
        raise HTTPException(status_code=404, detail="worklog not found")

    worklog = crud.worklog.remove(db=db, id=id)
    return worklog
