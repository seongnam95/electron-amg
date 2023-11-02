import axios from "axios";
import { EmployeeType } from "~/types/contract";
import { DataResponse } from "~/types/response";

export interface CreateEmployeeBody {
  name: string;
  phone: string;
  address: string;
  startPeriod: string;
  endPeriod: string;
  bank: string;
  bankNum: string;
  ssn: string;
  bankBook: string;
  idCard: string;
  sign: string;
}

export function createEmployee(body: CreateEmployeeBody) {
  return axios.post("/employee/", body);
}

// export function updateEmployee(id: string, contractor: ContractorType) {
//   const { idFront, idBack, ...rest } = contractor;
//   const body: Partial<CreateEmployeeBody> = {
//     ...rest,
//     ssn: `${idFront}${idBack}`,
//   };
//   return axios.put(`/employee/${id}`, removeEmptyValueObj(body));
// }

export const fetchEmployee = async (
  name: string,
  ssn: string
): Promise<EmployeeType> => {
  const params = { name: name, ssn: ssn };
  const endpoint = "/employee/search/";

  const { data } = await axios.get<DataResponse<EmployeeType>>(endpoint, {
    params,
  });
  return data.result;
};
