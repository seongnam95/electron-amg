export const SALARY_CODE = {
  daily: '일급',
  weekly: '주급',
  monthly: '월급',
} as const;
export type SalaryType = keyof typeof SALARY_CODE;

export interface ContractData {
  id: string;
  groupName: string;
  salary: SalaryType;
  defaultWage: number;
  startPeriod: string;
  endPeriod: string;
}
