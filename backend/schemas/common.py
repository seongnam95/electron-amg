from pydantic import BaseModel


def check_update_fields(model_class, values: dict):
    allowed_fields = set(model_class.__annotations__.keys())

    if not any(key in allowed_fields for key in values.keys()):
        raise ValueError("At least one field to update must be provided")
    return values


def snake_to_camel(string: str) -> str:
    components = string.split("_")
    return components[0] + "".join(x.title() for x in components[1:])


class CamelBaseModel(BaseModel):
    class Config:
        alias_generator = snake_to_camel
        populate_by_name = True
