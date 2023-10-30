import { TeamData } from './team';

export interface UserData {
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
  isApproved: boolean;
  teams: Array<TeamData>;
}

export interface CurrentUser {
  isLogin: boolean;
  user: UserData;
}

/** 워커 생성 API 바디 */
export type UserCreateBody = { password: string } & Omit<UserData, 'id'>;

/** 워커 업데이트 API 바디 */
export type UserUpdateBody = Partial<Omit<UserCreateBody, 'name' | 'username'>>;
