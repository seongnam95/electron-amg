import { FetchApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import authAxios from './apiClient';

interface APIGroupData {
  id: number;
  name: string;
  hex_color: string;
  explanation: string;
  create_date: string;
  user?: {
    name: string;
    username: string;
    id: number;
    is_admin: boolean;
    is_approved: boolean;
  };
}

const transformGroupData = (apiData: APIGroupData): GroupData => {
  return {
    id: apiData.id.toString(),
    name: apiData.name,
    hexColor: apiData.hex_color,
    explanation: apiData.explanation,
    createDate: apiData.create_date,
    userId: apiData.user?.id.toString(),
    userName: apiData.user?.name,
  };
};

export const fetchGroups = async (): Promise<GroupData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/group/');
  if (response.data.success && response.data.result) {
    return response.data.result.map(transformGroupData);
  }
  throw new Error('Failed to fetch groups');
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
