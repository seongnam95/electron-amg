import csv
import os
import random
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from response_model import BaseResponse
from collections import defaultdict

import models, schemas, crud
from ... import deps

router = APIRouter()

px_img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAwADAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q=="


@router.delete("/clear")
def delete_all_data(db: Session = Depends(deps.get_db)):
    # db.query(models.Team).delete()
    # db.query(models.user_team).delete()
    # db.query(models.Unit).delete()
    db.query(models.Employee).delete()
    db.query(models.Attendance).delete()
    db.query(models.Draft).delete()
    db.commit()


@router.post("/init/employee")
def init_data(db: Session = Depends(deps.get_db)):
    user: models.User = (
        db.query(models.User).filter(models.User.username == "test").first()
    )
    team: models.Team = user.teams[0]
    positions: List[models.Position] = team.positions

    employees = csv_to_employees()
    admin_body = schemas.EmployeeCreate(
        name="곽승재",
        ssn="9501011111111",
        phone="01012341234",
        address="서울 마포구 토정로 53",
        bank="카카오",
        bank_num="33303131215",
        start_period="2023-12-01",
        end_period="2023-12-31",
        id_card=px_img,
        bank_book=px_img,
        sign_base64=px_img,
        user_id=user.id,
        team_id=team.id,
        position_id=positions[0].id,
    )

    employee_bodys = []
    employee_bodys.append(admin_body)

    position_ids = defaultdict(list)
    for position in positions:
        position_ids[position.name].append(position.id)

    assigned_counts = defaultdict(int)
    position_counts = {"팀장": 1, "부팀장": 1, "기사": 2, "사무보조": 1}

    for employee in employees:
        assigned_position = None

        # 남은 position 중에서 랜덤 선택
        # while not assigned_position:
        #     random_position_name = random.choice(list(position_counts.keys()))
        #     if (
        #         assigned_counts[random_position_name]
        #         < position_counts[random_position_name]
        #     ):
        #         assigned_position = random.choice(position_ids[random_position_name])
        #         assigned_counts[random_position_name] += 1
        #         break

        body = schemas.EmployeeCreate(
            name=employee["name"],
            ssn=employee["ssn"],
            phone=employee["phone"],
            address="서울 마포구 토정로 53",
            bank=employee["bank"],
            bank_num=employee["bank_num"],
            start_period="2023-12-01",
            end_period="2023-12-31",
            id_card=px_img,
            bank_book=px_img,
            sign_base64=px_img,
            team_id=team.id,
            position_id=assigned_position,
        )

        employee_bodys.append(body)

    for obj in employee_bodys:
        crud.employee.create_employee(db=db, employee_in=obj)


def csv_to_employees():
    employees = []
    with open(f"{os.getcwd()}/employees.csv", mode="r", encoding="utf-8") as inp:
        reader = csv.reader(inp)

        for rows in reader:
            employee = {
                "name": rows[0].strip(),
                "ssn": rows[1].strip(),
                "phone": rows[2].strip(),
                "bank": rows[3].strip(),
                "bank_num": rows[4].strip(),
            }
            employees.append(employee)

        return employees


@router.post("/init/attendance", response_model=BaseResponse)
def create_init_attendances(db: Session = Depends(deps.get_db)):
    employees = db.query(models.Employee).all()
    for employee in employees:
        random_days = generate_random_days()

        for day in random_days:
            day = str(day)

            attendance_in = schemas.AttendanceCreate(
                position_id=employee.position_id,
                pay=employee.position.standard_pay,
                include_meal_cost=False,
                working_date=f"23-12-{day.zfill(2)}",
            )
            crud.attendance.create_attendance(
                db=db, attendance_in=attendance_in, employee=employee
            )

    return BaseResponse(msg="정상 처리되었습니다.")


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
