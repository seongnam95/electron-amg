from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from db.base_class import Base


# 근로자 개인정보
class Personal(Base):
    __tablename__ = "personal"

    id = Column(Integer, primary_key=True, index=True)  # PK

    bank = Column(String, nullable=False)  # 은행명
    bank_number_enc = Column(Text, nullable=False)  # 계좌번호 (암호화)
    ssn_enc = Column(Text, nullable=False)  # 주민등록번호 (암호화)

    sign_enc = Column(Text, nullable=False)  # 서명 Base64

    worker_id = Column(Integer, ForeignKey("worker.id"), unique=True)
    worker = relationship("Worker", back_populates="personal")
