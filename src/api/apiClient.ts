import axios from 'axios';

let isTokenRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const authAxios = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
  withCredentials: true,
});

function addRefreshSubscriber(cb: (token: string) => void) {
  subscribers.push(cb);
}

function onTokenRefreshed(token: string) {
  subscribers.forEach(cb => cb(token));
}

const getRefreshToken = async (): Promise<string | void> => {
  try {
    const res = await authAxios.post('auth/token/refresh');
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
    window.location.reload();
    // TODO : Logout Endpoint Request
  }
};

authAxios.interceptors.request.use(config => {
  if (!config.headers) return config;

  // 로그인 Endpoint가 아닐 경우, 헤더에 AccessToken 저장
  if (config.url !== '/auth/login' && config.url !== 'auth/token/refresh') {
    let token = sessionStorage.getItem('authorization');

    if (token !== null) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

authAxios.interceptors.response.use(
  response => response,
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
              resolve(authAxios(originalRequest));
            });
          });
        }

        // AccessToken 재발행
        const newAccessToken = await getRefreshToken();

        if (typeof newAccessToken === 'string') {
          originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return authAxios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default authAxios;
