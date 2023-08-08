import json
from typing import Any, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from api.api_v1.api import api_router
from exception_handlers import handle_invalid_code_error  # , handle_required_exception
from exceptions import InvalidCodeError
from starlette.middleware.base import BaseHTTPMiddleware
from response_model import BaseResponse


class CommonResponse(JSONResponse):
    def __init__(self, success, content, **kwargs):
        response_content = {
            "success": success,
            "result": content,
        }
        super().__init__(content=response_content, **kwargs)


class CommonResponseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        success = response.status_code < 400
        print(type(response))
        # response_body = b""
        # async for chunk in response.body_iterator:
        #     response_body += chunk

        # print(response_body)
        # content = json.loads(response_body.decode())

        return response


app = FastAPI()  # (default_response_class=CommonResponse)
# app.add_middleware(CommonResponseMiddleware)
app.include_router(api_router, prefix="/api/v1")

# 예외 핸들러
app.exception_handler(InvalidCodeError)(handle_invalid_code_error)


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        content={"success": False, "err_msg": str(exc.detail)},
        status_code=exc.status_code,
    )
