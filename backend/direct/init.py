from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .. import config
from .. import models  # 모델 정의가 포함된 모듈

# 데이터베이스 연결 설정
engine = create_engine(config.get_secret("SQL_DB_URL"), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 데이터베이스 세션 생성
db = SessionLocal()

# 데이터 삭제 쿼리 실행
db.query(models.Employee).delete()

# 변경 사항 커밋
db.commit()

# 세션 닫기
db.close()
