import requests
import csv
import os
import random

base_url = "http://localhost:8001/api/v1"
session = requests.Session()
px_img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAwADAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q=="


# Create User / Login
def login():
    create_user_body = {
        "name": "관리자",
        "username": "test",
        "password": "test",
        "is_admin": True,
        "is_approved": True,
        "access_ip": "122.24.12.34",
    }

    session.post(f"{base_url}/user", json=create_user_body)
    user_id = session.post(f"{base_url}/auth/login", json=create_user_body).json()["id"]

    return user_id


# Create Team
def create_team(user_id: str):
    create_team_body = {"name": "광명자이더샵포레나", "color": "#3284FF", "meal_cost": 7000}
    team_res = session.post(f"{base_url}/user/{user_id}/team", json=create_team_body)

    if team_res.status_code == 200:
        return team_res.json()["result"]["id"]


# Create Position
def create_positions(team_id: str):
    create_position_bodys = [
        {"name": "팀장", "salary_code": 1, "color": "#F87B6A", "standard_pay": 100000},
        {"name": "부팀장", "salary_code": 1, "color": "#F8A66A", "standard_pay": 100000},
        {"name": "알바", "salary_code": 1, "color": "#71B3F0", "standard_pay": 80000},
        {"name": "기사", "salary_code": 1, "color": "#B491FF", "standard_pay": 100000},
        {"name": "홍보단", "salary_code": 2, "color": "#64E6AF", "standard_pay": 450000},
        {"name": "사무보조", "salary_code": 3, "color": "#F4A3F1", "standard_pay": 2500000},
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
                "name": rows[0],
                "ssn": rows[1],
                "phone": rows[2],
                "bank": rows[3],
                "bank_num": rows[4],
            }
            employees.append(employee)

        return employees


def create_employees(*, team_id, positions, employees):
    crate_employee_res = []
    for employee in employees:
        position = random.choice(positions)

        create_employee_body = {
            "name": employee["name"],
            "ssn": employee["ssn"],
            "phone": employee["phone"],
            "address": "서울 마포구 토정로 53",
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

    return crate_employee_res


# user_id = login()
team_id = "FidiwafZT1CeJsMYC8Gwsg"  # create_team(user_id)
positions = create_positions(team_id)

# print(positions)
print(create_employees(team_id=team_id, positions=positions, employees=get_employees()))
