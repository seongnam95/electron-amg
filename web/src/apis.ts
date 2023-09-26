import { Contract, Contractor, Salary } from "@types";
import axios from "axios";
import { ContractForm } from "./pages/AdminPage";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8001/api/v1",
});

const getGenderCode: { [key: string]: number } = {
  1: 1,
  2: 2,
  3: 1,
  4: 2,
};

interface WorkerBody {
  name: string;
  phone: string;
  residence: string;
  gender_code: number;
  bank: string;
  bank_num: string;
  ssn: string;
  bank_book: string;
  id_card: string;
}

interface ContractBody {
  sign_base64: string;
  company_name: string;
  salary: Salary;
  default_wage: string;
  start_period: string;
  end_period: string;
  position_code: number;
}

export function createWorker(contractor: Contractor) {
  const workerBody: WorkerBody = {
    name: contractor.name,
    phone: contractor.phone,
    gender_code: getGenderCode[contractor.idBack.slice(0, 1)],
    residence: contractor.residence,
    bank: contractor.bank,
    bank_num: contractor.bankNum,
    bank_book: contractor.bankbook,
    ssn: `${contractor.idFront}${contractor.idBack}`,
    id_card: contractor.identification,
  };

  return axiosClient.post("/worker", workerBody);
}

export function createContract(workerId: string, contract: Contract) {
  const contractBody: ContractBody = {
    salary: contract.salary,
    default_wage: contract.pay,
    start_period: contract.startPeriod,
    end_period: contract.endPeriod,
    company_name: contract.groupName,
    sign_base64: contract.sign,
    position_code: contract.positionCode,
  };
  console.log(contractBody);
  return axiosClient.post(`/contract/worker/${workerId}`, contractBody);
}

export function getWorker(name: string, ssn: string) {
  const params = {
    name: name,
    ssn: ssn,
  };
  return axiosClient.get("/worker/search/", { params });
}

type ContractFormBody = {
  position_code: number;
  group_name: string;
  salary: string;
  default_wage: string;
  start_period: string;
  end_period: string;
};

export function createContractForm(form: ContractForm) {
  const body: ContractFormBody = {
    position_code: form.positionCode,
    group_name: form.groupName,
    salary: form.salary,
    default_wage: form.pay,
    start_period: form.startPeriod,
    end_period: form.endPeriod,
  };
  return axiosClient.post("/form", body);
}

export function getContractForm(id: string) {
  return axiosClient.get(`/form/${id}`);
}
