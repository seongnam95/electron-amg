from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, String, Boolean
from db.base_class import Base

from uuid import uuid4
from b64uuid import B64UUID


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

    pay = Column(Integer, nullable=False)

    incentive = Column(Integer, nullable=False, default=0)  # 인센티브 (추가금)
    deduct = Column(Integer, nullable=False, default=0)  # 차감액
    memo = Column(String, nullable=True)  # 메모

    is_meal_included = Column(Boolean, nullable=False, default=False)  # 식대 포함
    working_date = Column(String, nullable=False)  # 근무일

    employee_id = Column(Integer, ForeignKey("employee.id"), nullable=False)
    employee = relationship("Employee", back_populates="attendances")
