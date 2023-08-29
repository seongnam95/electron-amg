import { FetchResponse } from '~/types/common';
import { UserData } from '~/types/user';
import { snakeToCamel } from '~/utils/snakeToCamel';

import axiosPrivate from './axios';

export const fetchUsers = async (): Promise<UserData[]> => {
  const response = await axiosPrivate.get<FetchResponse>('/user/');
  return snakeToCamel<UserData[]>(response.data.result);
};
