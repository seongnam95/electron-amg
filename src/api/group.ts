import { FetchApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import authAxios from './apiClient';

export const fetchGroups = async (): Promise<FetchApiResponse> => {
  const response = await authAxios.get<FetchApiResponse>('/group/');
  return response.data;
};

export const updateGroup = async ({
  groupId,
  updatedData,
}: {
  groupId: string;
  updatedData: Partial<GroupData>;
}): Promise<FetchApiResponse> => {
  const response = await authAxios.put<FetchApiResponse>(`/group/${groupId}/`, updatedData);
  return response.data;
};
