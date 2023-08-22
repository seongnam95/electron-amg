import axios from 'axios';

const amgApi = axios.create({
  baseURL: 'http://localhost:8001/api/v1/',
});

// amgApi.interceptors.request.use(
//   config => {
//     const accessToken = sessionStorage.getItem('accessToken');
//     const refreshToken = sessionStorage.getItem('refreshToken');
//     console.log('1번');
//     if (accessToken && refreshToken) {
//       Object.assign(config.headers.common, {
//         Authorization: accessToken,
//         'Refresh-Token': refreshToken,
//       });
//     }

//     return config;
//   },
//   error => Promise.reject(error),
// );

// amgApi.interceptors.response.use(
//   response => response,
//   async error => {
//     console.log('2번');
//     // Access Token이 만료되었을 경우
//     if (error.response && error.response.status === 401) {
//       const refreshToken = sessionStorage.getItem('refreshToken');

//       if (refreshToken) {
//         try {
//           // 새로운 Access Token 발행
//           const response = await amgApi.post('/token/', { refreshToken });
//           sessionStorage.setItem('accessToken', response.data.accessToken);

//           // 토큰 담은 후, 재요청
//           error.config.headers['Authorization'] = response.data.accessToken;
//           return amgApi.request(error.config);
//         } catch (refreshError) {
//           // Refresh Token이 유효하지 않을 경우
//           sessionStorage.removeItem('accessToken');
//           sessionStorage.removeItem('refreshToken');

//           // TODO: 로그아웃 로직
//         }
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default amgApi;
