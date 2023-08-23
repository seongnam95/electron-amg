import axios, { AxiosResponse } from 'axios';

interface LoginBody {
  username: string;
  password: string;
  access_ip: string;
}

export const loginUser = async <T = any, R = LoginBody>(body: R): Promise<AxiosResponse<T>> => {
  const response = await axios.post<T>('/auth/login', body);
  return response;
};
