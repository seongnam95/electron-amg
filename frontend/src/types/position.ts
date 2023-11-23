export const SALARY = {
  1: '일급',
  2: '주급',
  3: '월급',
} as const;
export type SalaryType = keyof typeof SALARY;

export interface PositionData {
  id: string;
  name: string;
  color: string;
  salaryCode: SalaryType;
  standardPay: number;
  incentivePay: number;
  isTeamLeader: boolean;
  isChild: boolean;
}

/** 근로자 생성 API 바디 */
export type PositionCreateBody = Omit<PositionData, 'id'>;

/** 근로자 업데이트 API 바디 */
export type PositionUpdateBody = Partial<PositionCreateBody>;
