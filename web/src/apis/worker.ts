import { Contractor } from "@types";
import { removeEmptyValueObj } from "@utils/objectUtil";
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
  const { idFront, idBack, ...rest } = contractor;
  const body: CreateWorkerBody = {
    ...rest,
    ssn: `${idFront}${idBack}`,
    genderCode: getGenderCode[contractor.idBack.slice(0, 1)],
  };

  return axios.post("/worker/", body);
}

export function updateWorker(id: string, contractor: Contractor) {
  const { idFront, idBack, ...rest } = contractor;
  const body: Partial<CreateWorkerBody> = {
    ...rest,
    ssn: `${idFront}${idBack}`,
  };
  return axios.put(`/worker/${id}`, removeEmptyValueObj(body));
}

export function getWorker(name: string, ssn: string) {
  const params = { name: name, ssn: ssn };
  return axios.get("/worker/search/", { params });
}
