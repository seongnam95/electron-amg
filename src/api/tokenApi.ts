import axios, { AxiosResponse } from 'axios';

import { ApiResponse, Token } from '~/types/common';

export const refreshToken = async <T = ApiResponse, R = string>(body: R): Promise<T> => {
  const header = {};
  const { data } = await axios.post<T, AxiosResponse<T>, R>('/auth/token/', body, header);
  return data;
};

export const verifyToken = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/auth/token');
  return response.data;
};
