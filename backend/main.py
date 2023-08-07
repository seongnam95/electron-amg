import json
from typing import Any, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from api.api_v1.api import api_router
from exception_handlers import handle_invalid_code_error  # , handle_required_exception
from exceptions import InvalidCodeError
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


class CommonResponseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        success = response.status_code < 400

        if success == True:
            body = b"".join([segment async for segment in response.body_iterator])
            content = json.loads(body.decode())
            common_response = {
                "success": success,
                "result": content,
            }
            return JSONResponse(
                content=common_response, status_code=response.status_code
            )
        else:
            return response


app = FastAPI()
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
