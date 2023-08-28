export interface UserData {
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
  isApproved: boolean;
}

export interface CurrentUser {
  isLogin: boolean;
  user: UserData;
}
