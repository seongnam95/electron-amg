import { EmployeeData } from './employee';
import { PositionData } from './position';
import { UnitCreateBody, UnitData } from './unit';

/** 그룹 데이터 인터페이스 */
export interface TeamData {
  id: string;
  name: string;
  color: string;
  mealCost: number;
  otPay: number;
  createDate: string;
  units: UnitData[];
  positions: PositionData[];
  leader?: EmployeeData;
  existTeam?: boolean;
}

/** 그룹 생성 API 바디 */
export type TeamCreateBody = {
  units?: UnitCreateBody[];
} & Pick<TeamData, 'name' | 'color' | 'otPay' | 'mealCost'>;

/** 그룹 업데이트 API 바디 */
export type TeamUpdateBody = Partial<TeamCreateBody>;
