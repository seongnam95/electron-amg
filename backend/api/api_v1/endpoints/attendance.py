from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse, DataResponse, ListResponse


router = APIRouter()


@router.get(
    "/team/{team_id}/attendance",
    response_model=ListResponse[schemas.Attendance],
)
def read_attendances(
    team_id: str,
    date: str,
    page: int = 1,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
):
    team = crud.team.get(db=db, id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="존재하지 않는 팀입니다.")

    attendances = []
    for employee in team.employees:
        attendance_objs = crud.attendance.get_all_attendance_by_month(
            db, employee_id=employee.id, date_str=date
        )

        if attendance_objs:
            for attendance in attendance_objs:
                attendances.append(attendance)

    response = deps.create_list_response(
        data=attendances, total=len(attendances), limit=limit, page=page
    )
    return ListResponse(msg="정상 처리되었습니다.", result=response)


# 근무로그 생성
@router.post("/employee/{employee_id}/attendance", response_model=BaseResponse)
def create_attendance(
    employee_id: str,
    attendance_in: schemas.AttendanceCreate,
    db: Session = Depends(deps.get_db),
):
    employee = crud.employee.get(db=db, id=employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="해당 직원을 찾을 수 없습니다.")

    crud.attendance.create_attendance(
        db=db, attendance_in=attendance_in, employee=employee
    )

    return BaseResponse(msg="정상 처리되었습니다.")


# 근무로그 업데이트
@router.put(
    "/attendance/{attendance_id}", response_model=DataResponse[schemas.Attendance]
)
def update_attendance(
    attendance_id: str,
    attendance_in: schemas.AttendanceUpdate,
    db: Session = Depends(deps.get_db),
):
    attendance = crud.attendance.get(db=db, id=attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="존재하지 않는 로그입니다.")

    attendance = crud.attendance.update_attendance(
        db=db, attendance=attendance, attendance_in=attendance_in
    )
    return DataResponse(msg="정상 처리되었습니다.", result=attendance)


# 로그 삭제
@router.delete("/attendance/{attendance_id}", response_model=BaseResponse)
def delete_attendance(
    attendance_id: str,
    db: Session = Depends(deps.get_db),
):
    attendance = crud.attendance.get(db=db, id=attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="존재하지 않는 로그입니다.")

    crud.attendance.remove(db=db, id=attendance.id)
    return BaseResponse(msg="정상 처리되었습니다.")
