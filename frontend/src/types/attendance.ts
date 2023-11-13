export interface AttendanceData {
  id: string;
  pay: number;
  incentive?: number;
  deduct?: number;
  memo?: string;
  isMealIncluded: boolean;
  workingDate: string;
}
