from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    create_engine,
    MetaData,
    Table,
)

table_name = "attendance"

# 데이터베이스 연결 생성
engine = create_engine("sqlite:///amgdb.db")
metadata = MetaData()

# 테이블 삭제
table_to_drop = Table(table_name, metadata, autoload_with=engine)
table_to_drop.drop(engine)
