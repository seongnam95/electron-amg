import { Contract } from "@types";
import axios from "axios";

export function createContract(workerId: string, contract: Contract) {
  return axios.post(`/contract/worker/${workerId}`, contract);
}
