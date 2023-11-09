from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    create_engine,
    MetaData,
    Table,
)

table_name = "position"

# 데이터베이스 연결 생성
engine = create_engine("sqlite:///amgdb.db")
metadata = MetaData()

# 테이블 삭제
# table_to_drop = Table(table_name, metadata, autoload_with=engine)
# table_to_drop.drop(engine)

team_table = Table("team", metadata, autoload_with=engine)

# 테이블 스키마 정의
table_to_create = Table(
    table_name,
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("color", String),
    Column("salary_code", Integer),
    Column("pay", Integer),
    Column("team_id", Integer, ForeignKey("team.id"), nullable=False),
)
metadata.create_all(engine)

print("완료")
