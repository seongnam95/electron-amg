export const POSITION_CODE = {
  "1": "팀장",
  "2": "부팀장",
  "3": "알바",
  "4": "기사",
  "5": "홍보단",
  "6": "기타",
} as const;
export type PositionType = keyof typeof POSITION_CODE;

export interface PositionData {
  name: string;
  positionCode: PositionType;
  unitPay: number;
}

export interface DraftData {
  startPeriod: string;
  endPeriod: string;
  teamName: string;
  position: PositionData;
}
