import { AttendanceData } from './attendance';

/** 근로자 데이터 인터페이스 */
export interface EmployeeData {
  id: string;
  name: string;
  phone: string;
  address: string;
  startPeriod: string;
  endPeriod: string;
  createDate: string;
  attendances?: Array<AttendanceData>;
}

export interface EmployeeDetailData extends EmployeeData {
  bank: string;
  bankNum: string;
  ssn: string;
  bankBook: string;
  idCard: string;
  sign: string;
}

/** 근로자 생성 API 바디 */
export type EmployeeCreateBody = Omit<EmployeeDetailData, 'id' | 'attendances'>;

/** 근로자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<EmployeeCreateBody>;

export const SALARY_CODE = {
  daily: '일급',
  weekly: '주급',
  monthly: '월급',
} as const;
export type SalaryType = keyof typeof SALARY_CODE;
