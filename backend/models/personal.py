from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from db.base_class import Base


# 근로자 개인정보
class Personal(Base):
    __tablename__ = "personal"

    id = Column(Integer, primary_key=True, index=True)  # PK

    bank = Column(String, nullable=False)  # 은행명
    bank_num_enc = Column(Text, nullable=False)  # 계좌번호 (암호화)
    ssn_enc = Column(Text, nullable=False)  # 주민등록번호 (암호화)

    sign_base64 = Column(Text, nullable=False)  # 서명 Base64

    bank_book_file_nm = Column(Text, nullable=False)  # 통장 사본
    id_card_file_nm = Column(Text, nullable=False)  # 신분증

    worker_id = Column(Integer, ForeignKey("worker.id"), unique=True)
    worker = relationship("Worker", back_populates="personal")
