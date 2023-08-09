import axios from 'axios';

import { ApiResponse } from '~/types/common';

export const fetchGroups = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/group/');
  return response.data;
};
