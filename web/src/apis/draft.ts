import { Contract, DataResponse } from "@types";
import axios from "axios";

export type ContractResponse = {
  id: string;
} & Omit<Contract, "signBase64">;

export const createContractDraft =
  <T = ContractResponse>() =>
  async (body: Contract): Promise<DataResponse<T>> => {
    const { data } = await axios.post<DataResponse<T>>("/draft", body);
    return data;
  };

export const fetchContractDraft = async <T = ContractResponse>(
  id: string
): Promise<DataResponse<T>> => {
  const { data } = await axios.get<DataResponse<T>>(`/draft/${id}`);
  return data;
};

export const fetchAllContractDraft =
  () =>
  async <T = Array<ContractResponse>>(): Promise<T> => {
    const response = await axios.get<DataResponse<T>>("/draft");
    return response.data.result;
  };
