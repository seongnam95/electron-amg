from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from response_model import DataResponse, BaseResponse
from ... import deps
from schemas import WorkerWithPersonal
from util.crypto import verify
import crud

router = APIRouter()


# 근로자 불러오기 (계약서 작성 시)
@router.get("/worker", response_model=DataResponse[WorkerWithPersonal | None])
def read_worker_for_params(
    name: str,
    phone: str,
    ssn: str,
    db: Session = Depends(deps.get_db),
):
    worker = crud.worker.get_worker_with_personal(db, name=name, phone=phone, ssn=ssn)
    return DataResponse(success=True, msg="정상 처리되었습니다.", result=worker)
