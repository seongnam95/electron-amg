from sqlalchemy import Column, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship
from .associations import user_team

from uuid import uuid4
from b64uuid import B64UUID


# 소속
class Team(Base):
    __tablename__ = "team"

    id = Column(
        String,
        primary_key=True,
        index=True,
        unique=True,
        default=lambda: str(B64UUID(uuid4())),
    )  # PK

    name = Column(String, nullable=False)  # 이름
    color = Column(String, nullable=False)  # 색상
    meal_cost = Column(Integer, nullable=False)  # 식대 금액

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    users = relationship("User", secondary=user_team, back_populates="teams")
    drafts = relationship("Draft", back_populates="team")
    employees = relationship("Employee", back_populates="team")
    positions = relationship(
        "Position", back_populates="team", cascade="all, delete-orphan"
    )
