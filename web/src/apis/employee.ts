import { ContractorType } from "@type/contract";
import { removeEmptyValueObj } from "@utils/objectUtil";
import axios from "axios";

const getGenderCode: { [key: string]: string } = {
  1: "1",
  2: "2",
  3: "1",
  4: "2",
};

type CreateEmployeeBody = {
  ssn: string;
  genderCode: string;
} & Omit<ContractorType, "idBack" | "idFront">;

export function createEmployee(contractor: ContractorType) {
  const { idFront, idBack, ...rest } = contractor;

  const body: CreateEmployeeBody = {
    ...rest,
    ssn: `${idFront}${idBack}`,
    genderCode: getGenderCode[contractor.idBack.slice(0, 1)],
  };

  return axios.post("/employee/", body);
}

export function updateEmployee(id: string, contractor: ContractorType) {
  const { idFront, idBack, ...rest } = contractor;
  const body: Partial<CreateEmployeeBody> = {
    ...rest,
    ssn: `${idFront}${idBack}`,
  };
  return axios.put(`/employee/${id}`, removeEmptyValueObj(body));
}

export function getEmployee(name: string, ssn: string) {
  const params = { name: name, ssn: ssn };
  return axios.get("/employee/search/", { params });
}
