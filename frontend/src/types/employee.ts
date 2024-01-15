import { Dayjs } from 'dayjs';

import { PositionData } from './position';

export const SALARY = {
  1: '일급',
  2: '주급',
  3: '월급',
} as const;
export type SalaryType = keyof typeof SALARY;

/** 근무자 데이터 인터페이스 */
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
  isVirtual: boolean;
  positionId: string;
  position: PositionData;
}

export interface EmployeeDocument {
  id: string;
  bankBook: string;
  idCard: string;
  signBase64: string;
}

/** 근무자 생성 API 바디 */
export type EmployeeCreateBody = Omit<EmployeeData, 'id' | 'position' | 'createDate'> &
  Omit<EmployeeDocument, 'id'>;

/** 근무자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<EmployeeData>;

export interface VirtualEmployeeFormData {
  name: string;
  period: [Dayjs, Dayjs];
  positionId: string;
  preset: number;
}
