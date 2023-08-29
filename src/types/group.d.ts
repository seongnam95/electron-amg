import { UserData } from './user';

export interface GroupData {
  id: string;
  name: string;
  hexColor?: string;
  explanation?: string;
  createDate?: string;
  user?: UserData;
  [key: string]: any;
}

export interface GroupUpdateBody {
  id?: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}
