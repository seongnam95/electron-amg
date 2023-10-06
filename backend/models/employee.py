from sqlalchemy import Column, Text, Integer, String, DateTime
from db.base_class import Base
from datetime import datetime
from sqlalchemy.orm import relationship


class Employee(Base):
    __tablename__ = "employee"

    id = Column(Integer, primary_key=True, index=True)  # PK

    name = Column(String, nullable=False)  # 이름
    phone = Column(String, nullable=False)  # 연락처
    residence = Column(String, nullable=False)  # 거주지
    gender_code = Column(Integer, nullable=False)  # 성별 코드
    bank = Column(String, nullable=False)  # 은행명
    bank_num_enc = Column(Text, nullable=False)  # 계좌번호 (암호화)
    ssn_enc = Column(Text, nullable=False)  # 주민등록번호 (암호화)

    bank_book_file_nm = Column(String, nullable=False)  # 통장 사본
    id_card_file_nm = Column(String, nullable=False)  # 신분증
    create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)

    contracts = relationship("Contract", back_populates="employee")
    worklogs = relationship(
        "WorkLog", back_populates="employee", cascade="all, delete-orphan"
    )
