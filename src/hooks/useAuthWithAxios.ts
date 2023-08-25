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
      const msg = error.response.data.msg;

      if (error.response.status === 401 && !originalRequest._retry) {
        switch (msg) {
          // 토큰 만료, Access-Token 발행 후, 재요청
          case 'EXPIRED_TOKEN' || 'INVALID_TOKEN':
            originalRequest._retry = true;

            const res = await axiosInstance.post('auth/token/refresh');
            const newAccessToken = res.headers['authorization'];

            if (newAccessToken) {
              sessionStorage.setItem('authorization', newAccessToken);
              originalRequest.headers['authorization'] = newAccessToken;

              return axiosInstance(originalRequest);
            }

          // 리프레쉬 토큰 만료, 로그아웃
          case 'EXPIRED_REFRESH_TOKEN':
            setUser(initUser);
            sessionStorage.clear();
          // TODO : Logout Endpoint
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
