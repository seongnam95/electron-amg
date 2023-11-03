import axios from "axios";
import { EmployeeType } from "~/types/contract";
import { DataResponse } from "~/types/response";

export interface CreateEmployeeBody {
  name: string;
  ssn: string;
  phone: string;
  address: string;
  bank: string;
  bankNum: string;
  bankBook: string;
  idCard: string;
  signBase64: string;
  startPeriod: string;
  endPeriod: string;
  positionId: string;
}

interface CreateEmployeeProps {
  teamId: string;
  body: CreateEmployeeBody;
}

export const createEmployee = ({ teamId, body }: CreateEmployeeProps) => {
  return axios.post(`/team/${teamId}/employee`, body);
};

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
