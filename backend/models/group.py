from sqlalchemy import Column, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Group(Base):
    __tablename__ = "group"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 그룹명
    hex_color = Column(String, nullable=False)  # 그룹 색상
    explanation = Column(Integer, nullable=False)  # 그룹 설명

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    worker = relationship("Worker", back_populates="group")
