from typing import List, TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")


class InitResponse(BaseModel):
    success: bool


class BaseResponse(InitResponse, Generic[T]):
    result: T


class ListResponse(InitResponse, Generic[T]):
    count: int
    result: List[T]
