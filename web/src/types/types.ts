export const POSITION_CODE = {
  "1": "팀장",
  "2": "부팀장",
  "3": "알바",
  "4": "기사",
  "5": "홍보단",
  "6": "기타",
} as const;
export type PositionType = keyof typeof POSITION_CODE;

export interface PositionData {
  id: string;
  name: string;
  pay: number;
}

export interface DraftData {
  startPeriod: string;
  endPeriod: string;
  teamId: string;
  teamName: string;
  positionId: "";
  unitPay: 0;
}

export interface EmployeeType {
  id: string;
  name: string;
  phone: string;
  address: string;
  bank: string;
  bankNumCover: string;
}

export interface ContractorData {
  name: string;
  phone: string;
  address: string;
  signBase64: string;
}

export interface FormValueType {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;
  address: string;
  bank: string;
  bankNum: string;
  idCard: string;
  bankBook: string;
  contractConsent: boolean;
  personalConsent: boolean;
  signBase64: string;
}

export interface DataResponse<T> {
  msg: boolean;
  result: T;
}
