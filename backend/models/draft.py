from sqlalchemy import Column, ForeignKey, String, Date, DateTime, Integer
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Draft(Base):
    __tablename__ = "draft"

    id = Column(String, primary_key=True, index=True, unique=True)

    salary_code = Column(Integer, nullable=False)  # 급여 종류
    preset = Column(Integer, nullable=False, default=0)  # 급여별 프리셋

    start_period = Column(Date, nullable=False)  # 계약 시작일
    end_period = Column(Date, nullable=False)  # 계약 종료일

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    team = relationship("Team", uselist=False, back_populates="drafts")
    team_id = Column(String, ForeignKey("team.id"), nullable=False)

    position = relationship("Position", uselist=False, back_populates="draft")
    position_id = Column(String, ForeignKey("position.id"), nullable=False)
