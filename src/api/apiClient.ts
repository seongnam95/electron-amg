import axios from 'axios';

const amgApi = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
  withCredentials: true,
});

// 토큰 인증 인터셉터
amgApi.interceptors.response.use(
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
        const res = await amgApi.post('auth/token/refresh');
        const newAccessToken = res.headers['authorization'];

        if (newAccessToken) {
          sessionStorage.setItem('authorization', newAccessToken);
          amgApi.defaults.headers['authorization'] = newAccessToken;
          originalRequest.headers['authorization'] = newAccessToken;

          return amgApi(originalRequest);
        }
      } catch (refreshError) {
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default amgApi;
