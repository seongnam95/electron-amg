import { PositionType } from './contract';

export interface WorkLogData {
  id: string;
  positionCode: PositionType;
  wage: number;
  workingDate: string;
}

export type WorklogCreateBody = {
  workingDate?: string;
} & Omit<WorkLogData, 'id' | 'workingDate'>;

export type WorklogUpdateBody = Pick<WorkLogData, 'id' | 'wage'>;
