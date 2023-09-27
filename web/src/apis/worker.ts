import { Contractor } from "@types";
import axios from "axios";

const getGenderCode: { [key: string]: string } = {
  1: "1",
  2: "2",
  3: "1",
  4: "2",
};

export function createWorker(contractor: Contractor) {
  const body: Contractor = {
    ...contractor,
    genderCode: getGenderCode[contractor.idBack.slice(0, 1)],
  };

  const workerBody: Contractor = {
    name: contractor.name,
    phone: contractor.phone,
    genderCode: getGenderCode[contractor.idBack.slice(0, 1)],
    residence: contractor.residence,
    bank: contractor.bank,
    bank_num: contractor.bankNum,
    bank_book: contractor.bankbook,
    ssn: `${contractor.idFront}${contractor.idBack}`,
    id_card: contractor.idCard,
  };

  return axios.post("/worker", workerBody);
}

export function getWorker(name: string, ssn: string) {
  const params = { name: name, ssn: ssn };
  return axios.get("/worker/search/", { params });
}
