from fastapi import HTTPException
from starlette.responses import JSONResponse


def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        content={"msg": str(exc.detail)},
        status_code=exc.status_code,
    )
