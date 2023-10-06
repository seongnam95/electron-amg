import { ContractType } from "@type/contract";
import axios from "axios";

export function createContract(employeeId: string, contract: ContractType) {
  return axios.post(`/contract/employee/${employeeId}`, contract);
}
