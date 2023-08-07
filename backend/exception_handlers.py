from fastapi.exceptions import RequestValidationError
from starlette.responses import JSONResponse

from exceptions import InvalidCodeError


def create_response(
    success: bool, msg: str, status_code: int, **extra_data
) -> JSONResponse:
    content = {"success": success, "msg": msg, **extra_data}  # 추가 데이터를 병합
    return JSONResponse(status_code=status_code, content=content)


# 잘못된 코드 입력
def handle_invalid_code_error(request, exc: InvalidCodeError):
    return create_response(success=False, msg=str(exc), status_code=400)


# 필수 필드 미입력
# def handle_required_exception(request, exc: RequestValidationError):

#     required_fields = [
#         err["loc"][1] for err in exc.errors() if err["type"] == "missing"
#     ]

#     return create_response(
#         success=False,
#         msg=exc.errors(),
#         missing_fields=required_fields,
#         status_code=400,
#     )
