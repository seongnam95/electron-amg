from fastapi import APIRouter

from .endpoints import auth, user, worker, personal, contract, worklog, draw

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(worker.router, prefix="/worker", tags=["Worker"])
api_router.include_router(draw.router, prefix="/draw", tags=["Draw"])
api_router.include_router(contract.router, prefix="/contract", tags=["Contract"])
api_router.include_router(worklog.router, tags=["Work Log"])
api_router.include_router(
    personal.router, prefix="/worker/{worker_id}/personal", tags=["Personal Info"]
)
