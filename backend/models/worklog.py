from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, DateTime, ForeignKey, TIMESTAMP
from db.base_class import Base
from datetime import datetime


# 근무 일지
class WorkLog(Base):
    __tablename__ = "worklog"

    id = Column(Integer, primary_key=True, index=True)  # PK

    start_datetime = Column(DateTime, nullable=True, default=datetime.now)  # 출근 타임
    end_datetime = Column(DateTime, nullable=True)  # 퇴근 타임
    daily_wage = Column(Integer, nullable=True)  # 일당

    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="worklogs")
