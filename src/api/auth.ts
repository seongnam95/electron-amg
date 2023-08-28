import { AxiosResponse } from 'axios';

import authAxios from './apiClient';

interface LoginBody {
  username: string;
  password: string;
  access_ip?: string;
}

export const loginUser = async (body: LoginBody): Promise<AxiosResponse> => {
  const response = await authAxios.post<AxiosResponse>('/auth/login', body);
  return response;
};
