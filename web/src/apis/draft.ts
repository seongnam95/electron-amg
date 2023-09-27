import { Contract, DataResponse } from "@types";
import axios from "axios";

export const createContractDraft =
  <T = Contract>() =>
  async (body: Contract): Promise<DataResponse<T>> => {
    const { data } = await axios.post<DataResponse<T>>("/draft", body);
    return data;
  };

export const fetchContractDraft =
  <T = Contract>() =>
  async (id: string): Promise<DataResponse<T>> => {
    const { data } = await axios.get<DataResponse<T>>(`/draft/${id}`);
    return data;
  };

export type ContractResponse = {
  id: string;
} & Omit<Contract, "signBase64">;

export const fetchAllContractDraft =
  () => async (): Promise<Array<ContractResponse>> => {
    const response = await axios.get<DataResponse<Array<ContractResponse>>>(
      "/draft"
    );
    return response.data.result;
  };
