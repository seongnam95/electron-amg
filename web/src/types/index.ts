export const SalaryData = {
  daily: "일급",
  weekly: "주급",
  monthly: "월급",
} as const;

export type Salary = keyof typeof SalaryData;

export interface Contract {
  repName: string;
  companyName: string;
  companyAddress: string;
  salary: Salary;
  pay: string;
  startPeriod: string;
  endPeriod: string;
}

export interface Contractor {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;

  address: string;
  bank: string;
  bankNum: string;

  identification: string;
  bankbook: string;

  sign: string;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  residence: string;
  personal: Personal;
}

export interface Personal {
  id: string;
  bank: string;
  bankNum: string;
  ssn: string;
  sign: string;
}
