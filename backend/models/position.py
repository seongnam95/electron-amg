from sqlalchemy import Column, ForeignKey, Integer, String
from db.base_class import Base
from sqlalchemy.orm import relationship


# 직위
class Position(Base):
    __tablename__ = "position"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    position_code = Column(Integer, nullable=False)  # 직위 코드
    unit_pay = Column(Integer, nullable=False)  # 단가

    employee = relationship("Employee", back_populates="position")
    draft = relationship("Draft", back_populates="position")

    # 소속 (팀)
    team_id = Column(Integer, ForeignKey("team.id"), nullable=False)
    team = relationship("Team", uselist=False, back_populates="positions")
