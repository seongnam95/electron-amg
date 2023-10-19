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

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    user = relationship("User", back_populates="team")

    contracts = relationship("Contract", back_populates="team")
