from sqlalchemy import Column, Boolean, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    username = Column(String, unique=True, nullable=False)  # 계정
    hashed_password = Column(String, nullable=False)  # 비밀번호

    is_admin = Column(Boolean, default=False, nullable=False)  # 어드민 여부
    is_approved = Column(Boolean, default=False, nullable=False)  # 계정 활성화/비활성화

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    team = relationship("Team", back_populates="user", uselist=False)
