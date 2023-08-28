import { FetchApiResponse, UpdateApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import authAxios from './apiClient';

export const fetchGroups = async (): Promise<GroupData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/group/');
  return response.data.result.map((group: GroupData) => ({
    ...group,
    id: String(group.id),
    user: group.user
      ? {
          ...group.user,
          id: String(group.user?.id),
        }
      : undefined,
  }));
};

interface GroupUpdateBody {
  id: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}

export const updateGroup = async (group: GroupUpdateBody): Promise<UpdateApiResponse> => {
  const updateBody = {
    ...(group.name && { name: group.name }),
    ...(group.hexColor && { hex_color: group.hexColor }),
    ...(group.explanation && { explanation: group.explanation }),
    ...(group.userId && { user_id: group.userId }),
  };

  const response = await authAxios.put<UpdateApiResponse>(`/group/${group.id}/`, updateBody);
  return response.data;
};
