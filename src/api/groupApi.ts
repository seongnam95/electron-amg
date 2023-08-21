import axios from 'axios';

import { FetchApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

export const fetchGroups = async (): Promise<FetchApiResponse> => {
  const response = await axios.get<FetchApiResponse>('/group/');
  return response.data;
};

export const updateGroup = async (
  groupId: string,
  updatedData: Partial<GroupData>,
): Promise<FetchApiResponse> => {
  const response = await axios.put<FetchApiResponse>(`/group/${groupId}/`, updatedData);
  return response.data;
};
