from fastapi import APIRouter

from .endpoints import auth, draft, user, worker, contract, worklog

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(worker.router, prefix="/worker", tags=["Worker"])
api_router.include_router(contract.router, prefix="/contract", tags=["Contract"])
api_router.include_router(draft.router, prefix="/draft", tags=["Draft"])
api_router.include_router(worklog.router, tags=["Work Log"])
