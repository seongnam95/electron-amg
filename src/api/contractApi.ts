import { FetchApiResponse } from '~/types/common';

import authAxios from './apiClient';

export const fetchValidContracts = async (worker_id: string): Promise<FetchApiResponse> => {
  const response = await authAxios.get<FetchApiResponse>(`/worker/${worker_id}/contract/`);
  return response.data;
};
