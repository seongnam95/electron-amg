export const SALARY_CODE = {
  daily: "일급",
  weekly: "주급",
  monthly: "월급",
} as const;
export type Salary = keyof typeof SALARY_CODE;

export const POSITION_CODE = {
  1: "팀장",
  2: "부팀장",
  3: "알바",
  4: "기사",
  5: "홍보단",
  6: "기타",
} as const;
export type Position = keyof typeof POSITION_CODE;

export interface Contract {
  salary: Salary;
  defaultWage: string;
  startPeriod: string;
  endPeriod: string;
  groupName: string;
  positionCode: Position;
  signBase64?: string;
}

export interface Contractor {
  id?: string;

  name: string;
  phone: string;
  idFront: string;
  idBack: string;

  residence: string;
  bank: string;
  bankNum: string;

  idCard: string;
  bankbook: string;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  residence: string;
  bank: string;
  bankNumCover: string;
  bankBook: string;
  idCard: string;
}

export interface DataResponse<T> {
  success: boolean;
  count?: number;
  result: T;
}
