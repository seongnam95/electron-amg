import { Contract, Contractor } from "@types";
import { atom } from "recoil";

export const initContract: Contract = {
  repName: "김지호",
  companyName: "에이엠지(AMG)",
  companyAddress: "남양주시 미금로57번길 20, 715-2102",
  salary: "daily",
  positionCode: 1,
  pay: "0",
  startPeriod: "",
  endPeriod: "",
  sign: "",
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
