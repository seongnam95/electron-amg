import sched
from apscheduler.schedulers.background import BackgroundScheduler
from db.session import SessionLocal
from models import Employee, Draft
from datetime import datetime, timedelta
from sqlalchemy.orm import Session


# 180일 경과 된 직원 삭제
def delete_old_employees():
    db = SessionLocal()

    six_months_ago = datetime.now() - timedelta(days=180)
    old_employees = (
        db.query(Employee).filter(Employee.create_date <= six_months_ago).all()
    )

    for employee in old_employees:
        db.delete(employee)

    db.commit()


# 만료된 계약서 초안 삭제
def delete_expired_draft():
    db = SessionLocal()

    expired_drafts = db.query(Draft).filter(Draft.end_period <= datetime.now()).all()

    for draft in expired_drafts:
        db.delete(draft)

    db.commit()


sched = BackgroundScheduler(timezone="Asia/Seoul")
sched.add_job(delete_old_employees, "interval", days=1)
sched.add_job(delete_expired_draft, "interval", days=1)
