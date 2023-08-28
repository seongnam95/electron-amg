import { FetchApiResponse } from '~/types/common';
import { UserData } from '~/types/user';

import authAxios from './apiClient';

interface UserFetchResponse {
  id: number;
  name: string;
  username: string;
  is_admin: boolean;
  is_approved: boolean;
}

const _transformUserData = (data: UserFetchResponse): UserData => {
  return {
    id: data.id.toString(),
    name: data.name,
    username: data.username,
    isAdmin: data.is_admin,
    isApproved: data.is_approved,
  };
};

export const fetchUsers = async (): Promise<UserData[]> => {
  const response = await authAxios.get<FetchApiResponse>('/user/');
  if (response.data.success && response.data.result) {
    return response.data.result.map(_transformUserData);
  }
  throw new Error('Failed to fetch users');
};
