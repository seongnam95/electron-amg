from sqlalchemy import Column, ForeignKey, Text, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Employee(Base):
    __tablename__ = "employee"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    phone = Column(String, nullable=False)  # 연락처
    address = Column(String, nullable=False)  # 거주지

    bank = Column(String, nullable=False)  # 은행명
    bank_num_enc = Column(Text, nullable=False)  # 계좌번호 (암호화)
    ssn_enc = Column(Text, nullable=False)  # 주민등록번호 (암호화)

    bank_book_file_nm = Column(String, nullable=False)  # 통장 사본
    id_card_file_nm = Column(String, nullable=False)  # 신분증

    sign_base64 = Column(Text, nullable=False)  # 서명 Base64
    start_period = Column(DateTime(timezone=True), nullable=False)  # 계약 시작일
    end_period = Column(DateTime(timezone=True), nullable=False)  # 계약 종료일

    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    # 소속
    team = relationship("Team", uselist=False, back_populates="employees")
    team_id = Column(Integer, ForeignKey("team.id"), nullable=False)

    # 직위
    position = relationship("Position", uselist=False, back_populates="employee")
    position_id = Column(Integer, ForeignKey("position.id"), nullable=False)

    # 근무 로그
    attendances = relationship(
        "Attendance", back_populates="employee", cascade="all, delete-orphan"
    )
