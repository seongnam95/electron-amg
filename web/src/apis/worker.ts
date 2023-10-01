import { Contractor } from "@types";
import axios from "axios";

const getGenderCode: { [key: string]: string } = {
  1: "1",
  2: "2",
  3: "1",
  4: "2",
};

type CreateWorkerBody = {
  ssn: string;
  genderCode: string;
} & Omit<Contractor, "idBack" | "idFront">;

export function createWorker(contractor: Contractor) {
  const body: CreateWorkerBody = {
    ...contractor,
    ssn: `${contractor.idFront}${contractor.idBack}`,
    genderCode: getGenderCode[contractor.idBack.slice(0, 1)],
  };

  return axios.post("/worker", body);
}

export function getWorker(name: string, ssn: string) {
  const params = { name: name, ssn: ssn };
  return axios.get("/worker/search/", { params });
}
