export interface AttendanceData {
  id: string;
  pay: number;
  isMealIncluded: boolean;
  workingDate: string;
  incentive: number;
  deduct: number;
  memo: string;
  employeeId: string;
}

/** 근로자 생성 API 바디 */
export type AttendanceCreateBody = Omit<AttendanceData, 'id'>;

/** 근로자 업데이트 API 바디 */
export type AttendanceUpdateBody = Partial<AttendanceCreateBody>;
