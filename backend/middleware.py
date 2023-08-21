from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        session_id = request.session.get("session_id")
        print(request.url.path)
        if not session_id and request.url.path != "/api/v1/auth/login":
            return JSONResponse(status_code=404, content={"err_msg": "세션이 만료되었습니다."})

        response = await call_next(request)
        return response
