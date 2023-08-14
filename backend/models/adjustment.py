from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from db.base_class import Base
from datetime import datetime


# 근무 일지
class Adjustment(Base):
    __tablename__ = "adjustment"

    id = Column(Integer, primary_key=True, index=True)  # PK

    amount = Column(Integer, nullable=False)  # 금액
    reason = Column(Integer, nullable=False)  # 사유
    operation_type_code = Column(Integer, nullable=False)  # 사칙연산 코드

    worklog_id = Column(Integer, ForeignKey("worklog.id"))
    worklog = relationship("Worklog", back_populates="adjustments")

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)
