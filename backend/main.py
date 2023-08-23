from fastapi import FastAPI, HTTPException
from fastapi.middleware import Middleware, cors

from api.api_v1.api import api_router
from exception_handlers import http_exception_handler


middleware = [
    Middleware(
        cors.CORSMiddleware,
        allow_credentials=True,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["Authorization"],
    )
]

app = FastAPI(middleware=middleware)

app.include_router(api_router, prefix="/api/v1")
app.exception_handler(HTTPException)(http_exception_handler)
