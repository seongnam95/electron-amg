import { FetchApiResponse } from '~/types/common';
import { UserData } from '~/types/user';
import { snakeToCamel } from '~/utils/snakeToCamel';

import authAxios from './apiClient';

export const fetchUsers = async (): Promise<UserData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/user/');
  return snakeToCamel<UserData[]>(response.data.result);
};
