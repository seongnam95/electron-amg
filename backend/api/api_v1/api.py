from fastapi import APIRouter

from .endpoints import worker, personal, contract, worklog

api_router = APIRouter(prefix="/worker")
api_router.include_router(worker.router, tags=["Worker"])
api_router.include_router(
    personal.router, prefix="/{worker_id}/personal", tags=["personal Info"]
)
api_router.include_router(
    contract.router, prefix="/{worker_id}/contract", tags=["Contract"]
)
api_router.include_router(worklog.router, prefix="/worklog", tags=["Work Log"])
