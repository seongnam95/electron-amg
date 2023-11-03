import { atom } from "recoil";
import { ContractorData, DraftData } from "~/types/types";

// Step
export const stepState = atom<number>({
  key: "stepState",
  default: 0,
});

// Draft
export const initDraft: DraftData = {
  startPeriod: "",
  endPeriod: "",
  teamId: "",
  teamName: "",
  positionId: "",
  unitPay: 0,
};

export const draftState = atom<DraftData>({
  key: "draftStore",
  default: initDraft,
});

// Contractor
export const initContractor: ContractorData = {
  name: "",
  phone: "",
  address: "",
  signBase64: "",
};

export const contractorState = atom<ContractorData>({
  key: "contractorStore",
  default: initContractor,
});
