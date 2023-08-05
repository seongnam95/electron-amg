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

    # TODO: 계약서가 Worker 하나당 하나만 존재해야 하는지 검토 (unique=True)
    worker_id = Column(Integer, ForeignKey("worker.id"))
    worker = relationship("Worker", back_populates="contract")
