import { Dayjs } from 'dayjs';

import { PositionData } from './position';

/** 그룹 데이터 인터페이스 */
export interface DraftData {
  id: string;
  startPeriod: string;
  endPeriod: string;
  createDate: string;
  position: PositionData;
}

/** 그룹 생성 API 바디 */
export type DraftCreateBody = {
  positionId: string;
} & Omit<DraftData, 'id' | 'createDate' | 'position'>;
