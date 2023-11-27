import { PositionData } from './position';

export interface AttendanceData {
  id: string;
  pay: number;
  prePay: number;
  memo: string;
  isMealIncluded: boolean;
  workingDate: string;
  employeeId: string;
  positionId: string;
  position: PositionData;
}

/** 근로자 생성 API 바디 */
export type AttendanceCreateBody = Omit<AttendanceData, 'id' | 'position'>;

/** 근로자 업데이트 API 바디 */
export type AttendanceUpdateBody = Partial<AttendanceCreateBody>;
