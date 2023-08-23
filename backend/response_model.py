import json
from typing import List, TypeVar, Generic
import typing
from fastapi import BackgroundTasks
from pydantic import BaseModel
from fastapi.responses import Response

T = TypeVar("T")


class InitResponse(BaseModel):
    success: bool


class BaseResponse(InitResponse, Generic[T]):
    result: T


class ListResponse(InitResponse, Generic[T]):
    count: int
    result: List[T]
