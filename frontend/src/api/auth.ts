import { AxiosResponse } from 'axios';

import axiosPrivate from './axios';

export interface LoginBody {
  username: string;
  password: string;
  accessIp?: string;
}

export const loginUser = async (body: LoginBody): Promise<AxiosResponse> => {
  const response = await axiosPrivate.post<AxiosResponse>('/auth/login', body);
  return response;
};

export const logoutUser = async (): Promise<AxiosResponse> => {
  const response = await axiosPrivate.post<AxiosResponse>('/auth/logout');
  return response;
};
