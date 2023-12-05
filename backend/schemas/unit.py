from typing import Optional
from pydantic import BaseModel


class UnitBase(BaseModel):
    name: str
    unit_pay: int


class UnitCreate(UnitBase):
    pass


class UnitUpdate(BaseModel):
    name: Optional[str] = None
    unit_pay: Optional[int] = None


class UnitResponse(UnitBase):
    id: str
    team_id: str
