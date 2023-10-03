import { ContractType } from "@type/contract";
import axios from "axios";

export function createContract(workerId: string, contract: ContractType) {
  return axios.post(`/contract/worker/${workerId}`, contract);
}
