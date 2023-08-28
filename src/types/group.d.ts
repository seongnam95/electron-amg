import { UserData } from './user';

export interface GroupData {
  id: string;
  name: string;
  hexColor?: string;
  explanation?: string;
  createDate?: string;
  user?: UserData;
}

export interface GroupUpdateBody {
  id?: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}
