import { AxiosResponse } from 'axios';

import axiosPrivate from './axios';

interface LoginBody {
  username: string;
  password: string;
  access_ip?: string;
}

export const loginUser = async (body: LoginBody): Promise<AxiosResponse> => {
  const response = await axiosPrivate.post<AxiosResponse>('/auth/login', body);
  return response;
};
