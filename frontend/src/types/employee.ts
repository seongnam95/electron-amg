import { AttendanceData } from './attendance';
import { ContractData } from './contract';

export const GENDER_CODE = {
  1: '남자',
  2: '여자',
} as const;

export type GenderType = keyof typeof GENDER_CODE;

/** 근로자 데이터 인터페이스 */
export interface EmployeeData {
  id: string;
  name: string;
  phone: string;
  residence: string;
  genderCode: GenderType;
  createDate: string;
  isAttendance: boolean;
  hasContract: boolean;
  contract?: ContractData;
  attendance?: AttendanceData;
}

/** 근로자 생성 API 바디 */
export type EmployeeCreateBody = Pick<EmployeeData, 'name' | 'genderCode' | 'phone' | 'residence'>;

/** 근로자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<Omit<EmployeeCreateBody, 'genderCode'>>;

/** 근로자 그룹 이동 API 바디 */
export type EmployeeMoveGroupBody = {
  groupId?: string;
  employeeIds: string[];
};
