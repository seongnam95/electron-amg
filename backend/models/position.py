from sqlalchemy import Column, ForeignKey, Integer, String
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
    position_code = Column(Integer, nullable=False)  # 직위 코드
    unit_pay = Column(Integer, nullable=False)  # 단가

    employee = relationship("Employee", back_populates="position")
    draft = relationship("Draft", back_populates="position")

    # 소속 (팀)
    team_id = Column(Integer, ForeignKey("team.id"), nullable=False)
    team = relationship("Team", uselist=False, back_populates="positions")
