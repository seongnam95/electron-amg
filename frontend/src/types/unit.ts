export interface UnitData {
  id: string;
  name: string;
  unitPay: number;
  teamId: string;
}

/** 근로자 생성 API 바디 */
export type UnitCreateBody = Omit<UnitData, 'id' | 'teamId'>;

/** 근로자 업데이트 API 바디 */
export type UnitUpdateBody = Partial<UnitCreateBody>;
