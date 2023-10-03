import { ContractType, ContractorType } from "@type/contract";
import { atom } from "recoil";

export const initContract: ContractType = {
  salary: "daily",
  positionCode: "1",
  defaultWage: "0",
  startPeriod: "",
  endPeriod: "",
  signBase64: "",
  groupName: "",
};

type ContractorStateType = Pick<
  ContractorType,
  "id" | "name" | "phone" | "residence"
>;
export const initContractor: ContractorStateType = {
  id: "",
  name: "",
  phone: "",
  residence: "",
};

export const ContractState = atom<ContractType>({
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
