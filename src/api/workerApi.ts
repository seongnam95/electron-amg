import { FetchApiResponse } from '~/types/common';

import apiClient from './apiClient';

export const fetchWorkers = async (): Promise<FetchApiResponse> => {
  const response = await apiClient.get<FetchApiResponse>('/worker/');
  return response.data;
};
