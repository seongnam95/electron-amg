import axios from 'axios';

import localStore from '~/stores/electron-store';

const amgApi = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
});

amgApi.interceptors.request.use(
  config => {
    const accessToken = localStore.get('accessToken');
    const refreshToken = localStore.get('refreshToken');

    if (accessToken && refreshToken) {
      Object.assign(config.headers.common, {
        Authorization: accessToken,
        'Refresh-Token': refreshToken,
      });
    }

    return config;
  },
  error => Promise.reject(error),
);

amgApi.interceptors.response.use(
  response => response,
  async error => {
    // Access Token이 만료되었을 경우
    if (error.response && error.response.status === 401) {
      const refreshToken = localStore.get('refreshToken');

      if (refreshToken) {
        try {
          // 새로운 Access Token 발행
          const response = await amgApi.post('/token/', { refreshToken });
          localStore.set('accessToken', response.data.accessToken);

          // 토큰 담은 후, 재요청
          error.config.headers['Authorization'] = response.data.accessToken;
          return amgApi.request(error.config);
        } catch (refreshError) {
          // Refresh Token이 유효하지 않을 경우
          localStore.delete('accessToken');
          localStore.delete('refreshToken');

          // TODO: 로그아웃 로직
        }
      }
    }

    return Promise.reject(error);
  },
);

export default amgApi;
