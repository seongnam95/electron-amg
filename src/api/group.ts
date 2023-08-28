import { FetchApiResponse, UpdateApiResponse } from '~/types/common';
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

export const updateGroup = async (group: Partial<GroupData>): Promise<UpdateApiResponse> => {
  const updateBody = {
    name: group.name,
    hex_color: group.hexColor,
    explanation: group.explanation,
    user_id: group.userId,
  };
  const response = await authAxios.put<UpdateApiResponse>(`/group/${group.id}/`, updateBody);
  return response.data;
};
