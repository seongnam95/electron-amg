from sqlalchemy import Column, Integer, String, Date, DateTime
from db.base_class import Base
from datetime import datetime


class Form(Base):
    __tablename__ = "form"

    id = Column(String, primary_key=True, index=True, unique=True)
    position_code = Column(Integer, nullable=False)  # 직위 코드
    group_name = Column(String, nullable=False)  # 협력 업체명
    salary = Column(String, nullable=False)  # 계약 급여 종류 (일급, 주급, 월급)
    default_wage = Column(Integer, nullable=False)  # 계약 급여
    start_period = Column(Date, nullable=False)  # 계약 시작일
    end_period = Column(Date, nullable=False)  # 계약 종료일

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)
