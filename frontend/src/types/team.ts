/** 그룹 데이터 인터페이스 */
export interface TeamData {
  id: string;
  name: string;
  color: string;
  createDate: string;
  userId?: number;
}

/** 그룹 생성 API 바디 */
export type TeamCreateBody = {
  userId?: string;
} & Pick<TeamData, 'name' | 'color'>;

/** 그룹 업데이트 API 바디 */
export type TeamUpdateBody = Partial<TeamCreateBody>;
