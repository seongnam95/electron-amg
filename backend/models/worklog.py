from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from db.base_class import Base
from datetime import datetime


# 근무 일지
class WorkLog(Base):
    __tablename__ = "worklog"

    id = Column(Integer, primary_key=True, index=True)  # PK

    group_id = Column(Integer, nullable=False)  # 그룹 ID
    position = Column(Integer, nullable=False)  # 포지션

    wage = Column(Integer, nullable=False)  # 일당
    working_date_str = Column(String, nullable=False)  # 근무일 (YYYYMMDD)

    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="worklogs")

    adjustment = relationship(
        "Adjustment", back_populates="adjustments", cascade="all, delete-orphan"
    )
