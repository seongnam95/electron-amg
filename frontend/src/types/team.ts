import { PositionCreateBody, PositionData } from './position';

/** 그룹 데이터 인터페이스 */
export interface TeamData {
  id: string;
  name: string;
  color: string;
  mealCost: number;
  createDate: string;
  positions: PositionData[];
}

/** 그룹 생성 API 바디 */
export type TeamCreateBody = {
  positions?: PositionCreateBody[];
} & Pick<TeamData, 'name' | 'color' | 'mealCost'>;

/** 그룹 업데이트 API 바디 */
export type TeamUpdateBody = Partial<TeamCreateBody>;
