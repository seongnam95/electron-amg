import { Contract, Contractor } from "@types";
import { atom } from "recoil";

export const initContract: Contract = {
  salary: "daily",
  positionCode: 1,
  defaultWage: "0",
  startPeriod: "",
  endPeriod: "",
  signBase64: "",
  groupName: "",
};

type ContractorStateType = Pick<
  Contractor,
  "id" | "name" | "phone" | "residence"
>;
export const initContractor: ContractorStateType = {
  id: "",
  name: "",
  phone: "",
  residence: "",
};

export const ContractState = atom<Contract>({
  key: "contractStore",
  default: initContract,
});

export const ContractorState = atom<ContractorStateType>({
  key: "contractorStore",
  default: initContractor,
});

export const stepState = atom<number>({
  key: "stepState",
  default: 0,
});
