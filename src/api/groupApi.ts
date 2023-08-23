import { FetchApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import amgApi from './apiClient';

export const fetchGroups = async (): Promise<FetchApiResponse> => {
  const response = await amgApi.get<FetchApiResponse>('/group/');
  return response.data;
};

export const updateGroup = async (
  groupId: string,
  updatedData: Partial<GroupData>,
): Promise<FetchApiResponse> => {
  const response = await amgApi.put<FetchApiResponse>(`/group/${groupId}/`, updatedData);
  return response.data;
};
