from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, Boolean
from db.base_class import Base

from uuid import uuid4
from b64uuid import B64UUID
from datetime import date


# 근무 일지
class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(
        String,
        primary_key=True,
        index=True,
        unique=True,
        default=lambda: str(B64UUID(uuid4())),
    )  # PK

    memo = Column(String, nullable=False, default="")  # 메모

    is_paid = Column(Boolean, nullable=False, default=False)  # 선지급
    include_meal_cost = Column(Boolean, nullable=False, default=False)  # 식대 포함
    ot_count = Column(Integer, nullable=False, default=0)  # OT

    working_date = Column(
        String, nullable=False, default=date.today().strftime("%Y-%m-%d")
    )  # 근무일

    position_id = Column(String, ForeignKey("position.id"), nullable=False)
    position = relationship("Position", back_populates="attendances")

    employee_id = Column(String, ForeignKey("employee.id"), nullable=False)
    employee = relationship("Employee", back_populates="attendances")
