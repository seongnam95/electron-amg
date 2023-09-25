import { Contractor, Salary } from "@types";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8001/api/v1";

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
  default_wage: number;
  start_period: string;
  end_period: string;
}

function createWorker(contractor: Contractor) {
  const body: WorkerBody = {
    name: contractor.name,
    phone: contractor.phone,
    gender_code: getGenderCode[contractor.idBack.slice(0, 1)],
  };
  return axios.post(`${BASE_URL}/worker`, body);
}

const getGenderCode: { [key: string]: number } = {
  1: 1,
  2: 2,
  3: 1,
  4: 2,
};
