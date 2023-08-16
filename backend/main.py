from fastapi import FastAPI, HTTPException
from api.api_v1.api import api_router
from config import get_secret
from exception_handlers import http_exception_handler

from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware


app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=get_secret("AUTH_SECRET_KEY"))
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

app.exception_handler(HTTPException)(http_exception_handler)
