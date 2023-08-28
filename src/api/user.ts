import { FetchApiResponse } from '~/types/common';
import { UserData } from '~/types/user';

import authAxios from './apiClient';

export const fetchUsers = async (): Promise<UserData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/user/');
  return response.data.result.map((user: UserData) => ({
    ...user,
    id: String(user.id),
  }));
};
