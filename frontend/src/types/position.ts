export const POSITION_CODE = {
  1: '팀장',
  2: '부팀장',
  3: '알바',
  4: '기사',
  5: '홍보단',
  6: '기타',
} as const;

export const POSITION_COLORS = {
  1: '#5665ED',
  2: '#FFA722',
  3: '#71B3F0',
  4: '#8371F0',
  5: '#60C77D',
  6: '#C8C8C8',
} as const;

export interface PositionData {
  id: string;
  name: string;
  positionCode: PositionType;
  unitPay: number;
}

export type PositionType = keyof typeof POSITION_CODE;

/** 근로자 생성 API 바디 */
export type PositionCreateBody = Omit<PositionData, 'id'>;

/** 근로자 업데이트 API 바디 */
export type PositionUpdateBody = Partial<PositionCreateBody>;
