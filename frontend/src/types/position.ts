export interface PositionData {
  id: string;
  name: string;
  color: string;
  standardPay: number;
  sortingIndex: number;
  isLeader: boolean;
  incentivePay: number;
  defaultEarnsIncentive: boolean;
  unitId: string;
}

/** 근로자 생성 API 바디 */
export type PositionCreateBody = {
  unitId: string;
} & Omit<PositionData, 'id'>;

/** 근로자 업데이트 API 바디 */
export type PositionUpdateBody = Partial<PositionCreateBody>;
