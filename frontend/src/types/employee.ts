import { AttendanceData } from './attendance';
import { PositionData } from './position';
import { TeamData } from './team';

/** 근로자 데이터 인터페이스 */
export interface EmployeeData {
  id: string;
  name: string;
  phone: string;
  address: string;
  startPeriod: string;
  endPeriod: string;
  createDate: string;
  position: PositionData;
  attendances?: Array<AttendanceData>;
}

export interface EmployeeDetailData extends EmployeeData {
  bank: string;
  bankNum: string;
  ssn: string;
  bankBook: string;
  idCard: string;
  sign: string;
  team: TeamData;
}

/** 근로자 생성 API 바디 */
export type EmployeeCreateBody = Omit<EmployeeDetailData, 'id' | 'attendances'>;

/** 근로자 업데이트 API 바디 */
export type EmployeeUpdateBody = Partial<EmployeeCreateBody>;
