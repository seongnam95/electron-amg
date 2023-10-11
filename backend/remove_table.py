from sqlalchemy import create_engine, MetaData, Table

# 데이터베이스 연결 생성
engine = create_engine("sqlite:///amgdb.db")

# 메타데이터 객체 생성
metadata = MetaData()

# 삭제할 테이블 로드 (여기서는 'your_table'로 가정)
table_to_drop = Table("worklog", metadata, autoload_with=engine)

# 테이블 삭제
table_to_drop.drop(engine)

print("완료")
