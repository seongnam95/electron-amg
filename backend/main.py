from fastapi import FastAPI, HTTPException
from config import get_secret
from exception_handlers import http_exception_handler

from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware import Middleware
from middleware import AuthMiddleware

from api.api_v1.api import api_router

middleware = [
    Middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["http://localhost:3000"],
        allow_methods=["*"],
        allow_headers=["*"],
    ),
    Middleware(SessionMiddleware, secret_key=get_secret("AUTH_SECRET_KEY")),
    Middleware(AuthMiddleware),
]

app = FastAPI(middleware=middleware)

app.include_router(api_router, prefix="/api/v1")
app.exception_handler(HTTPException)(http_exception_handler)
