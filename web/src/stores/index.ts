import { Contract, Contractor } from "@types";
import { atom } from "recoil";

export const initContract: Contract = {
  repName: "김지호",
  companyName: "에이엠지(AMG)",
  companyAddress: "남양주시 미금로57번길 20, 715-2102",
  salary: "daily",
  pay: 0,
  startPeriod: "",
  endPeriod: "",
};

export const initContractor: Contractor = {
  name: "",
  phone: "",
  address: "",
  bank: "",
  bankNum: "",
  residentId: "",
  identification: "",
  bankbook: "",
  sign: "",
};

export const ContractState = atom<Contract>({
  key: "contractStore",
  default: initContract,
});

export const ContractorState = atom<Contractor>({
  key: "contractorStore",
  default: initContractor,
});

export const stepState = atom<number>({
  key: "stepState",
  default: 0,
});
