# from sqlalchemy.orm import relationship
# from sqlalchemy import Column, Integer, DateTime, ForeignKey
# from db.base_class import Base
# from datetime import datetime


# # 근무 일지
# class Adjustment(Base):
#     __tablename__ = "adjustment"

#     id = Column(Integer, primary_key=True, index=True)  # PK

#     amount = Column(Integer, nullable=False)  # 연산 금액
#     reason = Column(Integer, nullable=False)  # 사유
#     operation_type_code = Column(Integer, nullable=False)  # 사칙연산 코드 [0: +, 1: -, 2: x]

#     manager_id = Column(Integer, nullable=False)  # 담당자 ID

#     worklog_id = Column(Integer, ForeignKey("worklog.id"))
#     worklog = relationship("Worklog", back_populates="adjustments")

#     create_date = Column(DateTime(timezone=True), nullable=False, default=datetime.now)
