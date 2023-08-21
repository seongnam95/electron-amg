import axios, { AxiosResponse } from 'axios';

import { FetchApiResponse, Token } from '~/types/common';

export const refreshToken = async <T = FetchApiResponse, R = string>(body: R): Promise<T> => {
  const header = {};
  const { data } = await axios.post<T, AxiosResponse<T>, R>('/auth/token/', body, header);
  return data;
};

export const verifyToken = async (): Promise<FetchApiResponse> => {
  const response = await axios.get<FetchApiResponse>('/auth/token');
  return response.data;
};
