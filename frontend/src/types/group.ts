import { UserData } from './user';

/** 그룹 데이터 인터페이스 */
export interface GroupData {
  id: string;
  name: string;
  hexColor: string;
  explanation?: string;
  createDate?: string;
  user?: UserData;
}

/** 그룹 생성 API 바디 */
export type GroupCreateBody = {
  userId?: string;
} & Pick<GroupData, 'name' | 'hexColor' | 'explanation'>;

/** 그룹 업데이트 API 바디 */
export type GroupUpdateBody = Partial<GroupCreateBody>;
