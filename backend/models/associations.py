from db.base_class import Base
from sqlalchemy import Column, ForeignKey, Integer, Table


user_team = Table(
    "user_team",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("user.id"), primary_key=True),
    Column("team_id", Integer, ForeignKey("team.id"), primary_key=True),
)
