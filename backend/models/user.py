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

    is_admin = Column(Boolean, default=False, nullable=False)  # Admin
    is_approved = Column(Boolean, default=False, nullable=False)  # 계정 승인

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    group = relationship("Group", uselist=False, back_populates="user")
