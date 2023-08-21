import axios, { AxiosResponse } from 'axios';

import { BaseApiResponse } from '~/types/common';

interface LoginBody {
  username: string;
  password: string;
  access_ip: string;
}

export const loginUser = async <T = BaseApiResponse, R = LoginBody>(body: R): Promise<T> => {
  const response = await axios.post<T>('http://localhost:8001/api/v1/auth/login', body);
  const accessToken = response.headers['Authorization'];

  return response.data;
};
