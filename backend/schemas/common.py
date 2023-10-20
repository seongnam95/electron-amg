from typing import List
from pydantic import BaseModel


def check_update_fields(model_class, values: dict):
    allowed_fields = set(model_class.__annotations__.keys())

    if not any(key in allowed_fields for key in values.keys()):
        raise ValueError("At least one field to update must be provided")
    return values


class MultipleIdBody(BaseModel):
    ids: List[int]
