import { PositionData } from './position';

export interface AttendanceData {
  id: string;
  preset: number;
  memo: string;
  otCount: number;
  workingDate: string;
  isPrepaid: boolean;
  includeMealCost: boolean;
  earnsIncentive: boolean;
  employeeId: string;
  positionId: string;
  position: PositionData;
}

/** 근로자 생성 API 바디 */
export type AttendanceCreateBody = Partial<Omit<AttendanceData, 'id' | 'position'>>;

/** 근로자 업데이트 API 바디 */
export type AttendanceUpdateBody = Partial<AttendanceCreateBody>;
