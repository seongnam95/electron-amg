import { FetchApiResponse } from '~/types/common';

import amgApi from './apiClient';

export const fetchValidContracts = async (worker_id: string): Promise<FetchApiResponse> => {
  const response = await amgApi.get<FetchApiResponse>(`/worker/${worker_id}/contract/`);
  return response.data;
};
