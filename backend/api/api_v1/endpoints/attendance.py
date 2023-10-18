from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse, DataResponse, ListResponse


router = APIRouter()


def get_attendance(attendance_id: int, db: Session = Depends(deps.get_db)):
    attendance = crud.attendance.get(db=db, id=attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="존재하지 않는 로그입니다.")
    return attendance


# 전체 근무로그 조회
@router.get("/", response_model=ListResponse[schemas.Attendance])
def read_all_attendance(
    date: Optional[str] = None,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    if date:
        attendances = crud.attendance.get_all_attendance_by_date(
            db, skip=skip, limit=limit, date_str=date
        )
    else:
        attendances = crud.attendance.get_multi(db, offset=skip, limit=limit)

    return ListResponse(count=len(attendances), msg="정상 처리되었습니다.", result=attendances)


# 근무로그 조회
@router.get("/{attendance_id}", response_model=DataResponse[schemas.Attendance])
def read_attendance(attendance: schemas.Attendance = Depends(get_attendance)):
    return DataResponse(result=attendance)


# 근무로그 업데이트
@router.put("/{attendance_id}", response_model=BaseResponse)
def update_attendance(
    *,
    attendance: schemas.Attendance = Depends(get_attendance),
    db: Session = Depends(deps.get_db),
    attendance_in: schemas.AttendanceUpdate,
):
    attendance = crud.attendance.update(db=db, db_obj=attendance, obj_in=attendance_in)
    return BaseResponse(msg="정상 처리되었습니다.")


# 로그 삭제
@router.delete("/{attendance_id}", response_model=BaseResponse)
def delete_attendance(
    *,
    attendance: schemas.Attendance = Depends(get_attendance),
    db: Session = Depends(deps.get_db),
):
    crud.attendance.remove(db=db, id=attendance.id)
    return BaseResponse(msg="정상 처리되었습니다.")
