import { AxiosResponse } from 'axios';

import authAxios from './apiClient';

interface LoginBody {
  username: string;
  password: string;
  access_ip?: string;
}

// export const loginUser = async <T = any, R = LoginBody>(body: R): Promise<AxiosResponse<T>> => {
//   const response = await authAxios.post<T>('/auth/login', body);
//   return response;
// };

export const loginUser = async (body: LoginBody): Promise<AxiosResponse> => {
  const response = await authAxios.post<AxiosResponse>('/auth/login', body);
  return response;
};
