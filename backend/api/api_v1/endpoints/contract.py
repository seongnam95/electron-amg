# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from ... import deps

# import crud
# from schemas import Contract, ContractResponse, Employee
# from response_model import BaseResponse, ListResponse

# router = APIRouter()


# # Contract 의존성
# def get_contract(contract_id: str, db: Session = Depends(deps.get_db)):
#     contract = crud.contract.get(db=db, id=contract_id)

#     if not contract:
#         raise HTTPException(status_code=404, detail="존재하지 않는 계약서입니다.")
#     return contract


# # 계약서 불러오기 *Dev
# @router.get("/", response_model=ListResponse[ContractResponse])
# def read_multi_contract(
#     page: int = 1, limit: int = 20, db: Session = Depends(deps.get_db)
# ):
#     offset = (page - 1) * limit
#     total = crud.employee.get_employee_count(db)
#     contracts = crud.contract.get_multi(db=db, offset=offset, limit=limit)

#     response = deps.create_list_response(
#         data=contracts, total=total, limit=limit, page=page
#     )
#     return ListResponse(msg="정상 처리되었습니다.", result=response)


# # 계약서 삭제
# @router.delete("/{contract_id}", response_model=BaseResponse)
# def delete_contract(
#     contract_id: str,
#     db: Session = Depends(deps.get_db),
# ):
#     contract = crud.contract.get(db=db, id=contract_id)
#     if not contract:
#         raise HTTPException(status_code=404, detail="존재하지 않는 계약서입니다.")

#     crud.contract.remove(db=db, id=contract.id)
#     return BaseResponse(msg="정상 처리되었습니다.")
