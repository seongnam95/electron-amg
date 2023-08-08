from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Worker(Base):
    __tablename__ = "worker"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    phone = Column(String, nullable=False)  # 연락처
    residence = Column(String, nullable=False)  # 거주지
    gender_code = Column(Integer, nullable=False)  # 성별 코드
    position_code = Column(Integer, nullable=False)  # 직위 코드

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    group_id = Column(Integer, ForeignKey("group.id"), nullable=True)
    group = relationship("Group", back_populates="worker")

    personal = relationship(
        "Personal",
        back_populates="worker",
        cascade="all, delete-orphan",
    )
    contract = relationship("Contract", uselist=False, back_populates="worker")
    worklogs = relationship(
        "WorkLog", back_populates="worker", cascade="all, delete-orphan"
    )
