from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ... import deps

import crud, schemas
from response_model import BaseResponse


router = APIRouter()
