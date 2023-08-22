import axios from 'axios';

const amgApi = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
});

amgApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== 'auth/token/refresh'
    ) {
      originalRequest._retry = true;

      console.log('Refresh Token');

      try {
        const res = await amgApi.post('auth/token/refresh');
        const newAccessToken = res.headers['authorization'];

        if (newAccessToken) {
          amgApi.defaults.headers['authorization'] = newAccessToken;
          originalRequest.headers['authorization'] = newAccessToken;
          return amgApi(originalRequest);
        }
      } catch (refreshError) {
        console.error('리프레쉬 실패');
        // TODO : Logout 로직
      }
    }

    return Promise.reject(error);
  },
);
export default amgApi;
