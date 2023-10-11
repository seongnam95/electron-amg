import { PositionType } from './contract';

export interface AttendanceData {
  id: string;
  positionCode: PositionType;
  wage: number;
  workingDate: string;
}
