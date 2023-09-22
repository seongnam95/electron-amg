from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from response_model import DataResponse, BaseResponse
from ... import deps
from models import Worker, Personal
from schemas import Worker, WorkerCreate
from util.crypto import verify
import crud

router = APIRouter()


# 근로자 불러오기 (계약서 작성 시)
@router.get("/worker", response_model=DataResponse[Worker | None])
def read_worker_for_params(
    name: str,
    phone: str,
    ssn: str,
    db: Session = Depends(deps.get_db),
):
    worker = (
        db.query(Worker)
        .filter(Worker.name == name)
        .filter(Worker.phone == phone)
        .first()
    )

    if worker:
        personal = db.query(Personal).filter(Personal.worker_id == worker.id).first()
        if not verify(ssn, personal.ssn_enc):
            worker = None

    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)
