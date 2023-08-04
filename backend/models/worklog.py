from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, DateTime, ForeignKey, TIMESTAMP
from db.base_class import Base


# 근무 일지
class WorkLog(Base):
    __tablename__ = "worklog"

    id = Column(Integer, primary_key=True, index=True)  # PK

    working_date = Column(DateTime, nullable=False)  # 근무 날짜
    start_time = Column(DateTime, nullable=True)  # 출근 타임
    end_time = Column(DateTime, nullable=True)  # 퇴근 타임

    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="worklogs")
