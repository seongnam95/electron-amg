import { FetchResponse } from '~/types/common';

import axiosPrivate from './axios';

export const fetchWorkers = async (): Promise<FetchResponse> => {
  const response = await axiosPrivate.get<FetchResponse>('/worker/');
  return response.data;
};
