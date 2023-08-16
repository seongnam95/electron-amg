from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from db.base_class import Base
from datetime import datetime, timedelta


# 계약 조건
class AuthSession(Base):
    __tablename__ = "auth_session"

    id = Column(Integer, primary_key=True, index=True)  # PK

    session_id = Column(String, nullable=False, unique=True)  # 세션
    last_access_ip = Column(String, nullable=False)  # 접속 IP

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)
    expiry_date = Column(DateTime, default=datetime.utcnow() + timedelta(hours=1))

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="auth_session")
