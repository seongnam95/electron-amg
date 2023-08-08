from fastapi import APIRouter

from .endpoints import worker, personal, contract, worklog

api_router = APIRouter()
api_router.include_router(worker.router, prefix="/worker", tags=["Worker"])
api_router.include_router(
    personal.router, prefix="/worker/{worker_id}/personal", tags=["Personal Info"]
)
api_router.include_router(contract.router, tags=["Contract"])
# api_router.include_router(worklog.router, prefix="/worklog", tags=["Work Log"])
