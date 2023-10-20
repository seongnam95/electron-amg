from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


# 소속
class Team(Base):
    __tablename__ = "team"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    color = Column(String, nullable=False)  # 색상
    meal_cost = Column(Integer, nullable=False, default=7000)  # 식대 금액

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    # 담당자
    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    user = relationship("User", back_populates="team", uselist=False)

    drafts = relationship("Draft", back_populates="team")
    employees = relationship("Employee", back_populates="team")
    positions = relationship(
        "Position", back_populates="team", cascade="all, delete-orphan"
    )
