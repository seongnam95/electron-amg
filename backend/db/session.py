from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import get_secret

engine = create_engine(get_secret("SQL_DB_URL"), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
