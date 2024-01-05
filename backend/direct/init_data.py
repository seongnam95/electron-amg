import requests
import csv
import os
import random

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import get_secret

engine = create_engine(get_secret("SQL_DB_URL"), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


base_url = "http://localhost:8001/api/v1"
session = requests.Session()
px_img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAwADAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q=="


# Create User / Login
def login():
    create_admin_body = {
        "name": "곽승재",
        "username": "test",
        "password": "test",
        "incentive_pay": 5000,
        "is_admin": True,
        "is_superuser": True,
        "is_approved": True,
        "access_ip": "122.24.12.34",
    }
    session.post(f"{base_url}/user", json=create_admin_body)

    user_id = session.post(f"{base_url}/auth/login", json=create_admin_body).json()[
        "id"
    ]
    print("계정 생성")
    return user_id


# Create Team
def create_team(user_id: str):
    empty_team_body = {"name": "트리우스광명", "color": "#FA5454", "meal_cost": 7000}
    session.post(f"{base_url}/user/{user_id}/team", json=empty_team_body)
    create_team_body = {"name": "광명자이더샵포레나", "color": "#3284FF", "meal_cost": 7000}
    team_res = session.post(f"{base_url}/user/{user_id}/team", json=create_team_body)

    if team_res.status_code == 200:
        print("팀 생성")
        return team_res.json()["result"]["id"]


# Create Position
def create_positions(team_id: str):
    create_position_bodys = [
        {
            "name": "팀장",
            "salary_code": 1,
            "color": "#F35F4A",
            "standard_pay": 100000,
            "is_included": False,
        },
        {
            "name": "부팀장",
            "salary_code": 1,
            "color": "#FC8B39",
            "standard_pay": 100000,
            "is_included": False,
        },
        {
            "name": "알바",
            "salary_code": 1,
            "color": "#57ABF8",
            "standard_pay": 80000,
            "is_included": True,
        },
        {
            "name": "기사",
            "salary_code": 1,
            "color": "#A075FD",
            "standard_pay": 92000,
            "is_included": True,
        },
        {
            "name": "홍보단",
            "salary_code": 2,
            "color": "#2ADA90",
            "standard_pay": 92000,
            "is_included": False,
        },
        {
            "name": "사무보조",
            "salary_code": 3,
            "color": "#6764FF",
            "standard_pay": 100000,
            "is_included": False,
        },
    ]

    positions = []
    for body in create_position_bodys:
        create_position_res = session.post(
            f"{base_url}/team/{team_id}/position", json=body
        ).json()
        positions.append(create_position_res["result"])

    return positions


# CSV to Dict list
def get_employees():
    employees = []
    with open(
        f"{os.getcwd()}/backend/employees.csv", mode="r", encoding="utf-8"
    ) as inp:
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


def create_employees(*, team_id, admin_id, positions, employees):
    crate_employee_res = []

    create_admin_body = {
        "name": "곽승재",
        "ssn": "9501011111111",
        "phone": "01012341234",
        "bank": "카카오뱅크",
        "bank_num": "33303131215",
        "start_period": "2023-11-01",
        "end_period": "2023-11-30",
        "id_card": px_img,
        "bank_book": px_img,
        "sign_base64": px_img,
        "user_id": admin_id,
        "position_id": positions[0]["id"],
    }

    session.post(f"{base_url}/team/{team_id}/employee", json=create_admin_body)

    for employee in employees:
        if employee["name"] == "정하성":
            position = positions[0]
        elif employee["name"] == "김인태":
            position = positions[1]
        elif employee["name"] == "나유은":
            position = positions[5]
        elif employee["name"] == "원민호":
            position = positions[4]
        elif employee["name"] == "남기건":
            position = positions[4]
        elif employee["name"] == "원민호":
            position = positions[3]
        elif employee["name"] == "이철호":
            position = positions[3]
        elif employee["name"] == "윤주호":
            position = positions[3]
        else:
            position = positions[2]

        create_employee_body = {
            "name": employee["name"],
            "ssn": employee["ssn"],
            "phone": employee["phone"],
            "bank": employee["bank"],
            "bank_num": employee["bank_num"],
            "start_period": "2023-11-01",
            "end_period": "2023-11-30",
            "id_card": px_img,
            "bank_book": px_img,
            "sign_base64": px_img,
            "position_id": position["id"],
        }
        res = session.post(
            f"{base_url}/team/{team_id}/employee", json=create_employee_body
        ).json()

        crate_employee_res.append(res)

    print("근무자 생성")
    return crate_employee_res


# user_id = login()
# team_id = create_team(user_id)
team_id = "Eng8D4rySeugVfZG0BYGpA"
# positions = create_positions(team_id)

# print(positions)
admin_id = "0y3dIt6AT0-N-tko0SrRPw"
create_employees(
    team_id=team_id,
    admin_id=admin_id,
    positions=positions,
    employees=get_employees(),
)
print("완료")
