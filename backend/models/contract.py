from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from db.base_class import Base
from datetime import datetime


# 계약 조건
class Contract(Base):
    __tablename__ = "contract"

    id = Column(Integer, primary_key=True, index=True)  # PK

    company_name = Column(String, nullable=False)  # 협력 업체명

    default_daily_wage = Column(Integer, nullable=False)  # 계약 일당
    start_date = Column(DateTime(timezone=True), nullable=False)  # 계약 시작일
    end_date = Column(DateTime(timezone=True), nullable=False)  # 계약 종료일
    valid = Column(Boolean, default=True, nullable=False)  # 유효 여부

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="contract")
