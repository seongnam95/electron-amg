from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from db.base_class import Base
from datetime import datetime


# 근무 일지
class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)  # PK

    position_code = Column(Integer, nullable=False)  # 포지션 코드
    wage = Column(Integer, nullable=False)  # 일당
    working_date = Column(String, nullable=False)

    employee_id = Column(Integer, ForeignKey("employee.id"), nullable=False)
    employee = relationship("Employee", back_populates="attendances")
