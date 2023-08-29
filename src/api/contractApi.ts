import { FetchResponse } from '~/types/common';

import axiosPrivate from './axios';

export const fetchValidContracts = async (worker_id: string): Promise<FetchResponse> => {
  const response = await axiosPrivate.get<FetchResponse>(`/worker/${worker_id}/contract/`);
  return response.data;
};
