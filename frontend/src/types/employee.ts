import { PositionData } from './position';

/** 근로자 데이터 인터페이스 */
export interface EmployeeData {
  id: string;
  name: string;
  phone: string;
  address: string;
  ssn: string;
  bank: string;
  bankNum: string;
  startPeriod: string;
  endPeriod: string;
  createDate: string;
  position: PositionData;
}

export interface EmployeeDetailData extends EmployeeData {
  bankBook: string;
  idCard: string;
  sign: string;
}

/** 근로자 생성 API 바디 */
export type EmployeeCreateBody = Omit<EmployeeDetailData, 'id' | 'attendances'>;

/** 근로자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<EmployeeCreateBody>;
