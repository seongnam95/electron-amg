import axios from 'axios';

import { camelToSnake, snakeToCamel } from '~/utils/snakeCamelConverter';

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE,
  withCredentials: true,
});

let isTokenRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function addRefreshSubscriber(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  subscribers.forEach(cb => cb(token));
}

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const res = await axiosPrivate.post('auth/token/refresh');
    const newAccessToken = res.headers['authorization'];

    // 발급이 정상적으로 되었을 경우
    if (newAccessToken) {
      isTokenRefreshing = false;
      onTokenRefreshed(newAccessToken);
      subscribers = [];
      sessionStorage.setItem('authorization', newAccessToken);

      return newAccessToken;
    }
  } catch (e) {
    isTokenRefreshing = false;
    subscribers = [];
    sessionStorage.removeItem('userPersist');
    sessionStorage.removeItem('authorization');
    // TODO : Logout Endpoint Request
  }
};

axiosPrivate.interceptors.request.use(config => {
  if (config.data) config.data = camelToSnake(config.data);
  if (config.params) config.params = camelToSnake(config.params);

  if (config.url !== '/auth/login' && config.url !== 'auth/token/refresh') {
    let token = sessionStorage.getItem('authorization');
    if (token !== null) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

axiosPrivate.interceptors.response.use(
  response => {
    if (response.data) response.data = snakeToCamel(response.data);
    return response;
  },

  async error => {
    const originalRequest = error.config;
    const msg = error.response.data.msg;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (msg === 'EXPIRED_TOKEN' || msg === 'INVALID_TOKEN') {
        originalRequest._retry = true;

        // 토큰 발행중일 경우 요청 대기
        if (isTokenRefreshing) {
          return new Promise(resolve => {
            addRefreshSubscriber((token: string) => {
              originalRequest.headers.Authorization = token;
              resolve(axiosPrivate(originalRequest));
            });
          });
        }

        // AccessToken 재발행
        const newAccessToken = await getRefreshToken();

        if (typeof newAccessToken === 'string') {
          originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosPrivate;
