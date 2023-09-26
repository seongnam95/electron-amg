from pydantic import BaseModel, field_validator
from datetime import date, datetime
from exceptions import InvalidCodeError


# 직위 코드 [1: 팀장, 2: 부팀장, 3: 알바, 4: 기사, 5: 홍보단, 6: 기타]
POSITION_CODES = [1, 2, 3, 4, 5, 6]


class FormBase(BaseModel):
    group_name: str
    position_code: int
    salary: str
    default_wage: int
    start_period: date
    end_period: date

    @field_validator("position_code")
    def validate_position_code(cls, value):
        if value not in POSITION_CODES:
            raise InvalidCodeError("position")
        return value


class FormCreate(FormBase):
    pass


class Form(FormBase):
    id: str
    create_date: datetime
