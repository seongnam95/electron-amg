export const SALARY_CODE = {
  daily: "일급",
  weekly: "주급",
  monthly: "월급",
} as const;
export type SalaryType = keyof typeof SALARY_CODE;

export const POSITION_CODE = {
  "1": "팀장",
  "2": "부팀장",
  "3": "알바",
  "4": "기사",
  "5": "홍보단",
  "6": "기타",
} as const;
export type PositionType = keyof typeof POSITION_CODE;

export interface ContractType {
  salary: SalaryType;
  defaultWage: string;
  startPeriod: string;
  endPeriod: string;
  groupName: string;
  positionCode: PositionType;
  signBase64?: string;
}

export interface ContractorType {
  id?: string;

  name: string;
  phone: string;
  idFront: string;
  idBack: string;

  residence: string;
  bank: string;
  bankNum: string;

  idCard: string;
  bankBook: string;
}

export interface WorkerType {
  id: string;
  name: string;
  phone: string;
  residence: string;
  bank: string;
  bankNumCover: string;
}

export interface DataResponse<T> {
  success: boolean;
  count?: number;
  result: T;
}

export interface FormValueType {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;
  residence: string;
  bank: string;
  bankNum: string;
  idCard: string;
  bankBook: string;
  contractConsent: boolean;
  personalConsent: boolean;
  signBase64: string;
}
