import axios from 'axios';

import { ApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

export const fetchGroups = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/group/');
  return response.data;
};

export const updateGroup = async (
  groupId: string,
  updatedData: Partial<GroupData>,
): Promise<ApiResponse> => {
  const response = await axios.put<ApiResponse>(`/group/${groupId}/`, updatedData);
  return response.data;
};
