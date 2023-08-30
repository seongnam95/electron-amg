from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Group(Base):
    __tablename__ = "group"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 그룹명
    hex_color = Column(String, nullable=False)  # 그룹 색상
    explanation = Column(String, nullable=True)  # 그룹 설명

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="group")

    workers = relationship("Worker", back_populates="group")

    def __repr__(self):
        return f"<Group id={self.id}, name={self.name}, hex_color={self.hex_color}, explanation={self.explanation}, create_date={self.create_date}, user_id={self.user_id}>"
