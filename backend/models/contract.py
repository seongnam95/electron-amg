from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from db.base_class import Base


# 계약 조건
class Contract(Base):
    __tablename__ = "contract"

    id = Column(Integer, primary_key=True, index=True)  # PK

    company = Column(String, nullable=False)  # 협력 업체

    daily_pay = Column(Integer, nullable=False)  # 일당
    start_date = Column(DateTime(timezone=True), nullable=False)  # 계약 시작일
    end_date = Column(DateTime(timezone=True), nullable=False)  # 계약 종료일

    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="contract")
