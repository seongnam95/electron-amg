from db.base_class import Base
from sqlalchemy import Column, ForeignKey, Integer, Table, String


user_team = Table(
    "user_team",
    Base.metadata,
    Column("user_id", String, ForeignKey("user.id"), primary_key=True),
    Column("team_id", String, ForeignKey("team.id"), primary_key=True),
)
