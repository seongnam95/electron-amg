from fastapi import FastAPI, HTTPException
from fastapi.middleware import Middleware, cors

from api.api_v1.api import api_router
from exception_handlers import http_exception_handler

from scheduled import sched

middleware = [
    Middleware(
        cors.CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        # allow_origins=[
        #     "http://localhost:3000",
        #     "http://127.0.0.1:3000",
        #     "http://localhost:5173",
        #     "http://127.0.0.1:5173",
        # ],
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["Authorization"],
    )
]

app = FastAPI(middleware=middleware)

app.include_router(api_router, prefix="/api/v1")
app.exception_handler(HTTPException)(http_exception_handler)


@app.on_event("startup")
def start_scheduler():
    sched.start()


@app.on_event("shutdown")
def stop_scheduler():
    sched.shutdown()
