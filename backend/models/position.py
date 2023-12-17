from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from db.base_class import Base
from sqlalchemy.orm import relationship

from uuid import uuid4
from b64uuid import B64UUID


# 직위
class Position(Base):
    __tablename__ = "position"

    id = Column(
        String,
        primary_key=True,
        index=True,
        unique=True,
        default=lambda: str(B64UUID(uuid4())),
    )  # PK

    name = Column(String, nullable=False)  # 이름
    color = Column(String, nullable=False)  # 색상
    salary_code = Column(Integer, nullable=False)  # 급여 종류
    preset = Column(Integer, nullable=False, default=1)  # 급여별 프리셋
    standard_pay = Column(Integer, nullable=False)  # 기준 단가
    sorting_index = Column(Integer, nullable=False)  # 순서

    incentive_pay = Column(Integer, nullable=False, default=2000)  # 팀장 인센 기준

    is_leader = Column(Boolean, nullable=False)  # 팀장 여부
    is_active = Column(Boolean, nullable=False, default=False)  # 활성화 여부
    default_earns_incentive = Column(Boolean, nullable=False)  # 팀장 인센티브 추가 여부

    employee = relationship("Employee", back_populates="position")
    draft = relationship("Draft", back_populates="position")
    attendances = relationship("Attendance", back_populates="position")

    # 소속 (팀)
    team_id = Column(String, ForeignKey("team.id"), nullable=False)
    team = relationship("Team", uselist=False, back_populates="positions")

    # 대행사 단가
    unit_id = Column(String, ForeignKey("unit.id"), nullable=False)
