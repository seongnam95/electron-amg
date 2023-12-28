import { PositionData } from './position';

export const SALARY = {
  1: '일급',
  2: '주급',
  3: '월급',
} as const;
export type SalaryType = keyof typeof SALARY;

/** 근로자 데이터 인터페이스 */
export interface EmployeeData {
  id: string;
  name: string;
  phone: string;
  ssn: string;
  bank: string;
  bankNum: string;
  startPeriod: string;
  endPeriod: string;
  salaryCode: SalaryType;
  preset: number;
  createDate: string;
  positionId: string;
  position: PositionData;
}

export interface EmployeeDocument {
  id: string;
  bankBook: string;
  idCard: string;
  sign: string;
}

/** 근로자 생성 API 바디 */
export type EmployeeCreateBody = Omit<EmployeeData, 'id' | 'attendances'>;

/** 근로자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<EmployeeData>;
