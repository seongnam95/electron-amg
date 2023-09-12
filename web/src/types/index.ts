export type Salary = "daily" | "weekly" | "monthly";

export interface Contract {
  repName: string;
  companyName: string;
  companyAddress: string;
  salary: Salary;
  pay: number;
  startPeriod: string;
  endPeriod: string;
}

export interface Contractor {
  name: string;
  phone: string;
  address: string;
  bank: string;
  bankNum: string;
  identification: string;
  bankbook: string;
  sign: string;
}
