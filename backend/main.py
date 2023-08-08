from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from api.api_v1.api import api_router
from exception_handlers import handle_invalid_code_error
from exceptions import InvalidCodeError

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000",  # 프론트엔드 서버의 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix="/api/v1")

# 예외 핸들러
app.exception_handler(InvalidCodeError)(handle_invalid_code_error)


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        content={"success": False, "err_msg": str(exc.detail)},
        status_code=exc.status_code,
    )
