from typing import List, TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")


class BaseResponse(BaseModel):
    success: bool
    msg: str


class DataResponse(BaseResponse, Generic[T]):
    result: T


class ListResponse(BaseResponse, Generic[T]):
    count: int
    result: List[T]
