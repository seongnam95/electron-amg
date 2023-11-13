import { PositionData } from './position';

export interface AttendanceData {
  id: string;
  pay: number;
  incentive?: number;
  deduct?: number;
  memo?: string;
  isMealIncluded: boolean;
  workingDate: string;
}

export interface EmployeeAttendanceData {
  id: string;
  name: string;
  position: PositionData;
  attendances?: AttendanceData[];
}

/** 근로자 생성 API 바디 */
export type AttendanceCreateBody = Omit<AttendanceData, 'id'>;

/** 근로자 업데이트 API 바디 */
export type AttendanceUpdateBody = Partial<AttendanceCreateBody>;
