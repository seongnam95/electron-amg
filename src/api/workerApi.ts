import axios from 'axios';

import { ApiResponse } from '~/types/common';

export const fetchWorkers = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/worker/');
  return response.data;
};
