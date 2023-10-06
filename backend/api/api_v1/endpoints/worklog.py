from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import DataResponse, ListResponse


router = APIRouter()


def get_worklog(worklog_id: int, db: Session = Depends(deps.get_db)):
    worklog = crud.worklog.get(db=db, id=worklog_id)
    if not worklog:
        raise HTTPException(status_code=404, detail="존재하지 않는 로그입니다.")
    return worklog


# 전체 근무로그 조회
@router.get("/worklog", response_model=ListResponse[schemas.WorkLog])
def read_all_worklog(
    date: Optional[str] = None,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    if date:
        worklogs = crud.worklog.get_all_worklog_by_date(
            db, skip=skip, limit=limit, date_str=date
        )
    else:
        worklogs = crud.worklog.get_multi(db, skip=skip, limit=limit)

    return ListResponse(success=True, count=len(worklogs), result=worklogs)


# 근무로그 조회
@router.get("/worklog/{worklog_id}", response_model=DataResponse[schemas.WorkLog])
def read_worklog(worklog: schemas.WorkLog = Depends(get_worklog)):
    return DataResponse(success=True, result=worklog)


# 근무로그 생성 (날짜 중복 불가)
@router.post(
    "/employee/{employee_id}/worklog", response_model=DataResponse[schemas.WorkLog]
)
def create_worklog(
    *,
    employee: schemas.Employee = Depends(deps.get_employee),
    db: Session = Depends(deps.get_db),
    worklog_in: schemas.WorkLogCreate,
):
    date_str = worklog_in.working_date_str

    if not date_str:
        current_datetime = datetime.now().date()
        date_str = current_datetime.strftime("%Y%m%d")

    existing_worklog = crud.worklog.get_worklog_for_employee_by_date(
        db=db, employee_id=employee.id, date_str=date_str
    )

    if existing_worklog:
        raise HTTPException(status_code=404, detail="근무로그가 이미 존재합니다.")

    worklog = crud.worklog.create_for_employee(
        db=db, obj_in=worklog_in, employee_id=employee.id
    )
    return DataResponse(success=True, result=worklog)


# 근무로그 업데이트
@router.put("/worklog/{worklog_id}", response_model=DataResponse[schemas.WorkLog])
def update_worklog(
    *,
    worklog: schemas.WorkLog = Depends(get_worklog),
    db: Session = Depends(deps.get_db),
    worklog_in: schemas.WorkLogUpdate,
):
    worklog = crud.worklog.update(db=db, db_obj=worklog, obj_in=worklog_in)
    return DataResponse(success=True, result=worklog)


# 출, 퇴근 로그 삭제
@router.delete("/worklog/{worklog_id}", response_model=schemas.WorkLog)
def delete_worklog(
    *,
    worklog: schemas.WorkLog = Depends(get_worklog),
    db: Session = Depends(deps.get_db),
):
    worklog = crud.worklog.remove(db=db, id=worklog.id)
    return worklog


# 근로자 전체 근무로그 조회
@router.get(
    "/employee/{employee_id}/worklog", response_model=ListResponse[schemas.WorkLog]
)
def read_all_worklog_for_employee(
    employee: schemas.Employee = Depends(deps.get_employee),
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    worklogs = crud.worklog.get_multi_for_employee(
        db, employee_id=employee.id, skip=skip, limit=limit
    )
    return ListResponse(success=True, count=len(worklogs), result=worklogs)
