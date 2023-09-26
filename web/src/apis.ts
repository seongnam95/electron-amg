import { Contract, Contractor, Salary } from "@types";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8001/api/v1";

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
  position_code: number;
  personal: PersonalBody;
}

interface PersonalBody {
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
}

export function createWorker(contractor: Contractor) {
  const personalBody: PersonalBody = {
    bank: contractor.bank,
    bank_num: contractor.bankNum,
    bank_book: contractor.bankbook,
    ssn: `${contractor.idFront}${contractor.idBack}`,
    id_card: contractor.identification,
  };

  const workerBody: WorkerBody = {
    name: contractor.name,
    phone: contractor.phone,
    gender_code: getGenderCode[contractor.idBack.slice(0, 1)],
    residence: contractor.residence,
    position_code: 1,
    personal: personalBody,
  };

  return axios.post(`${BASE_URL}/worker`, workerBody);
}

export function createContract(workerId: string, contract: Contract) {
  const contractBody: ContractBody = {
    salary: contract.salary,
    default_wage: contract.pay,
    start_period: contract.startPeriod,
    end_period: contract.endPeriod,
    company_name: contract.groupName,
    sign_base64: contract.sign,
  };
  console.log(contractBody);
  return axios.post(`${BASE_URL}/contract/worker/${workerId}`, contractBody);
}
