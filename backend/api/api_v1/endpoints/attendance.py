import random
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps
from schemas import AttendanceResponse, AttendanceCreate, AttendanceUpdate
import crud, schemas, models
from response_model import BaseResponse, DataResponse, ListResponse


router = APIRouter()


def generate_random_days(min_elements=5, max_elements=16, max_day=30, max_continuous=5):
    num_elements = random.randrange(min_elements, max_elements)
    start_day = random.randrange(1, max_day)

    # 연속된 일자 생성을 위한 기본 범위 설정
    # 연속되는 숫자의 최대 개수를 고려
    continuous_range = min(max_continuous, num_elements, max_day - start_day + 1)
    days = list(range(start_day, start_day + continuous_range))

    # 나머지 날짜 무작위 추가
    while len(days) < num_elements:
        day = random.randrange(1, max_day + 1)
        if day not in days:
            days.append(day)

    # 날짜 순으로 정렬
    days.sort()

    return days


@router.post("/attendance/init", response_model=BaseResponse)
def create_init_attendances(db: Session = Depends(deps.get_db)):
    employees = db.query(models.Employee).all()

    for employee in employees:
        random_days = generate_random_days()

        for day in random_days:
            day = str(day)

            attendance_in = AttendanceCreate(
                position_id=employee.position_id,
                pay=employee.position.standard_pay,
                meal_included=False,
                working_date=f"23-11-{day.zfill(2)}",
            )
            crud.attendance.create_attendance(
                db=db, attendance_in=attendance_in, employee=employee
            )

    return BaseResponse(msg="정상 처리되었습니다.")


@router.delete("/attendance/reset", response_model=BaseResponse)
def reset_attendances(db: Session = Depends(deps.get_db)):
    attendances = db.query(models.Attendance).all()

    for attendance in attendances:
        db.delete(attendance)
        db.commit()

    return BaseResponse(msg="정상 처리되었습니다.")


@router.get(
    "/team/{team_id}/attendance",
    response_model=ListResponse[AttendanceResponse],
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
    attendance_in: AttendanceCreate,
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
    "/attendance/{attendance_id}", response_model=DataResponse[AttendanceResponse]
)
def update_attendance(
    attendance_id: str,
    attendance_in: AttendanceUpdate,
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

    crud.attendance.delete(db=db, id=attendance.id)
    return BaseResponse(msg="정상 처리되었습니다.")
