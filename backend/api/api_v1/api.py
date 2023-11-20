from fastapi import APIRouter

from .endpoints import auth, draft, user, employee, attendance, team, position, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(employee.router, tags=["Employee"])
api_router.include_router(draft.router, prefix="/draft", tags=["Draft"])
api_router.include_router(attendance.router, tags=["Attendance"])
api_router.include_router(team.router, tags=["Team"])
api_router.include_router(position.router, prefix="/position", tags=["Position"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
