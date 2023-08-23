import { FetchApiResponse } from '~/types/common';

import amgApi from './apiClient';

export const fetchUsers = async (): Promise<FetchApiResponse> => {
  const response = await amgApi.get<FetchApiResponse>('/user/');
  return response.data;
};
