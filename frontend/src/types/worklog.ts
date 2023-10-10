import { PositionType } from './contract';

export interface WorkLogData {
  id: string;
  positionCode: PositionType;
  wage: number;
  workingDate: string;
}

export type WorkLogCreateBody = {
  workingDate?: string;
} & Omit<WorkLogData, 'id' | 'workingDate'>;

export type WorkLogUpdateBody = Pick<WorkLogData, 'id' | 'wage'>;
