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
export type PositionType = keyof typeof POSITION_CODE;

export interface ContractData {
  id: string;
  groupName: string;
  positionCode: PositionType;
  salary: string;
  defaultWage: number;
  startPeriod: string;
  endPeriod: string;
}
