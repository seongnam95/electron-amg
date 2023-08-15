from fastapi import APIRouter

from .endpoints import user, group, worker, personal, contract, worklog

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(group.router, prefix="/group", tags=["Group"])
api_router.include_router(worker.router, prefix="/worker", tags=["Worker"])
api_router.include_router(contract.router, prefix="/contract", tags=["Contract"])
api_router.include_router(worklog.router, tags=["Work Log"])
api_router.include_router(
    personal.router, prefix="/worker/{worker_id}/personal", tags=["Personal Info"]
)
