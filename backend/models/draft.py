from sqlalchemy import Column, ForeignKey, Integer, String, Date, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship

from uuid import uuid4
from b64uuid import B64UUID


class Draft(Base):
    __tablename__ = "draft"

    id = Column(
        String,
        primary_key=True,
        index=True,
        unique=True,
        default=lambda: str(B64UUID(uuid4())),
    )

    start_period = Column(Date, nullable=False)  # 계약 시작일
    end_period = Column(Date, nullable=False)  # 계약 종료일

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    team = relationship("Team", uselist=False, back_populates="drafts")
    team_id = Column(Integer, ForeignKey("team.id"), nullable=False)

    position = relationship("Position", uselist=False, back_populates="draft")
    position_id = Column(Integer, ForeignKey("position.id"), nullable=False)
