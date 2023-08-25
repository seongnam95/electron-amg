import { FetchApiResponse } from '~/types/common';

import authAxios from './apiClient';

export const fetchUsers = async (): Promise<FetchApiResponse> => {
  const response = await authAxios.get<FetchApiResponse>('/user/');
  return response.data;
};
