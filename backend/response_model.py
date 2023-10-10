from typing import List, Optional, TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")


class ListData(BaseModel, Generic[T]):
    total: int
    offset: int
    page: int
    next_page: int
    has_more: bool
    list: List[T]


class BaseResponse(BaseModel):
    msg: str


class DataResponse(BaseResponse, Generic[T]):
    result: T


class ListResponse(BaseResponse, Generic[T]):
    result: ListData[T]
