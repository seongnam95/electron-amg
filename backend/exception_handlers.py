from fastapi import HTTPException
from starlette.responses import JSONResponse


def create_response(
    success: bool, msg: str, status_code: int, **extra_data
) -> JSONResponse:
    content = {"success": success, "msg": msg, **extra_data}  # 추가 데이터를 병합
    return JSONResponse(status_code=status_code, content=content)


def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        content={"success": False, "msg": str(exc.detail)},
        status_code=exc.status_code,
    )
