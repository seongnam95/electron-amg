from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from db.base_class import Base
from sqlalchemy.orm import relationship

from uuid import uuid4
from b64uuid import B64UUID


# 직위
class Unit(Base):
    __tablename__ = "unit"

    id = Column(
        String,
        primary_key=True,
        index=True,
        unique=True,
        default=lambda: str(B64UUID(uuid4())),
    )  # PK

    name = Column(String, nullable=False)  # 이름
    unit_pay = Column(Integer, nullable=False)  # 단가

    # 소속 (팀)
    team_id = Column(String, ForeignKey("team.id"), nullable=False)
