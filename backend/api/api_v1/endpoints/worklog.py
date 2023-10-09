from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse, DataResponse, ListResponse


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

    return ListResponse(
        success=True, count=len(worklogs), msg="정상 처리되었습니다.", result=worklogs
    )


# 근무로그 조회
@router.get("/worklog/{worklog_id}", response_model=DataResponse[schemas.WorkLog])
def read_worklog(worklog: schemas.WorkLog = Depends(get_worklog)):
    return DataResponse(success=True, result=worklog)


# 근무로그 생성 (날짜 중복 불가)
@router.post("/employee/{employee_id}/worklog", response_model=BaseResponse)
def create_worklog(
    *,
    employee: schemas.Employee = Depends(deps.get_employee),
    db: Session = Depends(deps.get_db),
    worklog_in: schemas.WorkLogCreate,
):
    crud.worklog.create_worklog(db=db, worklog_in=worklog_in, employee_id=employee.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 근무로그 업데이트
@router.put("/worklog/{worklog_id}", response_model=BaseResponse)
def update_worklog(
    *,
    worklog: schemas.WorkLog = Depends(get_worklog),
    db: Session = Depends(deps.get_db),
    worklog_in: schemas.WorkLogUpdate,
):
    worklog = crud.worklog.update(db=db, db_obj=worklog, obj_in=worklog_in)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")


# 로그 삭제
@router.delete("/worklog/{worklog_id}", response_model=BaseResponse)
def delete_worklog(
    *,
    worklog: schemas.WorkLog = Depends(get_worklog),
    db: Session = Depends(deps.get_db),
):
    crud.worklog.remove(db=db, id=worklog.id)
    return BaseResponse(success=True, msg="정상 처리되었습니다.")
