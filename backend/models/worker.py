from sqlalchemy import Column, Integer, String, DateTime, Enum
from db.base_class import Base
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship


# 성별 코드 [0: 남자, 1: 여자]
class Gender(PyEnum):
    MALE = 0
    FEMALE = 1


# 직위 코드 [0: 직원, 1: 알바, 2: 기타]
class Position(PyEnum):
    STAFF = 0
    PART_TIME = 1
    ETC = 2


# 근로자
class Worker(Base):
    __tablename__ = "worker"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    phone = Column(String, nullable=False)  # 연락처
    residence = Column(String, nullable=False)  # 거주지

    gender_code = Column(Enum(Gender), nullable=False)  # 성별 코드
    position_code = Column(Enum(Position), nullable=False)  # 직위 코드

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    personal = relationship(
        "Personal",
        uselist=False,  # Worker 와 1:1 관계
        back_populates="worker",
        cascade="all, delete-orphan",  # Worker 삭제 될 경우 함께 삭제
    )
    contract = relationship(
        "Contract", uselist=False, back_populates="worker", cascade="all, delete-orphan"
    )
    worklogs = relationship(
        "WorkLog", back_populates="worker", cascade="all, delete-orphan"
    )
