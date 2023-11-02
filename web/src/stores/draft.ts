import { atom } from "recoil";
import { DraftData } from "~/types/draft";

export const initDraft: DraftData = {
  startPeriod: "",
  endPeriod: "",
  teamName: "",
  position: {
    name: "",
    unitPay: 0,
    positionCode: "1",
  },
};

export const draftState = atom<DraftData>({
  key: "DraftStore",
  default: initDraft,
});
