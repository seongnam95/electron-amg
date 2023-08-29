import { BaseApiResponse, FetchApiResponse, UpdateApiResponse } from '~/types/common';
import { GroupData } from '~/types/group';
import { snakeToCamel } from '~/utils/snakeToCamel';

import authAxios from './apiClient';

export const fetchGroups = async (): Promise<GroupData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/group/');
  return snakeToCamel<GroupData[]>(response.data.result);
};

interface GroupRequestBody {
  id?: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}

export const createGroup = async (group: GroupRequestBody): Promise<BaseApiResponse> => {
  const createBody = {
    name: group.name,
    hex_color: group.hexColor,
    explanation: group.explanation,
    ...(group.userId && { user_id: group.userId }),
  };

  const response = await authAxios.post<BaseApiResponse>(`/group`, createBody);
  return response.data;
};

export const updateGroup = async (group: GroupRequestBody): Promise<UpdateApiResponse> => {
  const updateBody = {
    ...(group.name && { name: group.name }),
    ...(group.hexColor && { hex_color: group.hexColor }),
    ...(group.explanation && { explanation: group.explanation }),
    ...(group.userId && { user_id: group.userId }),
  };

  const response = await authAxios.put<UpdateApiResponse>(`/group/${group.id}`, updateBody);
  return response.data;
};

export const removeGroup = async (id: string): Promise<BaseApiResponse> => {
  const response = await authAxios.delete<BaseApiResponse>(`/group/${id}`);
  return response.data;
};
