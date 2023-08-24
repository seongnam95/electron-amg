import axios, { AxiosInstance } from 'axios';
import { useSetRecoilState } from 'recoil';

import { initUser, userState } from '~/stores/user';

export const useAxiosWithAuth = (): AxiosInstance => {
  const setUser = useSetRecoilState(userState);

  const createAxiosInstance = () => {
    return axios.create({
      baseURL: 'http://localhost:8001/api/v1/',
      withCredentials: true,
    });
  };

  let axiosInstance = createAxiosInstance();

  axiosInstance.interceptors.request.use(config => {
    console.log(config.headers);
    if (!config.headers) return config;
    return config;
  });

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.msg === 'EXPIRED_TOKEN' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await axiosInstance.post('auth/token/refresh');
          const newAccessToken = res.headers['authorization'];

          if (newAccessToken) {
            sessionStorage.setItem('authorization', newAccessToken);
            axiosInstance.defaults.headers['authorization'] = newAccessToken;
            originalRequest.headers['authorization'] = newAccessToken;

            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          setUser(initUser);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
