from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from api.api_v1.api import api_router
from exception_handlers import handle_invalid_code_error  # , handle_required_exception

from exceptions import InvalidCodeError


app = FastAPI()
app.include_router(api_router, prefix="/api/v1")


# 예외 핸들러
app.exception_handler(InvalidCodeError)(handle_invalid_code_error)
# app.exception_handler(RequestValidationError)(handle_required_exception)
