import axios from 'axios';

import { FetchApiResponse } from '~/types/common';

export const fetchWorkers = async (): Promise<FetchApiResponse> => {
  const response = await axios.get<FetchApiResponse>('/worker/');
  return response.data;
};
