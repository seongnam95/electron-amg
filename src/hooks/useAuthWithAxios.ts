// import { useEffect } from 'react';

// import { AxiosInstance } from 'axios';

// export const useAxiosPrivate = (): AxiosInstance => {
//   useEffect(() => {
//     let isTokenRefreshing = false;
//     let subscribers: ((token: string) => void)[] = [];

//     function addRefreshSubscriber(cb: (token: string) => void) {
//       subscribers.push(cb);
//     }

//     function onTokenRefreshed(token: string) {
//       subscribers.forEach(cb => cb(token));
//     }

//     const getRefreshToken = async (): Promise<string | void> => {
//       console.log('Refresh Token');
//       try {
//         const res = await axiosAuth.post('auth/token/refresh');
//         const newAccessToken = res.headers['authorization'];

//         // 발급이 정상적으로 되었을 경우
//         if (newAccessToken) {
//           isTokenRefreshing = false;
//           onTokenRefreshed(newAccessToken);
//           subscribers = [];
//           return newAccessToken;
//         }
//       } catch (e) {
//         isTokenRefreshing = false;
//         subscribers = [];
//         sessionStorage.removeItem('userPersist');
//         sessionStorage.removeItem('authorization');
//         // TODO : Logout Endpoint Request
//       }
//     };

//     const requestInterceptor = axiosPrivate.interceptors.request.use(
//       config => {
//         console.log('Request');
//         let token = sessionStorage.getItem('authorization');
//         if (token !== null) {
//           config.headers['authorization'] = `Bearer ${token}`;
//         }
//         return config;
//       },
//       error => Promise.reject(error),
//     );

//     const responseInterceptor = axiosPrivate.interceptors.response.use(
//       response => response,
//       async error => {
//         console.log('Response Err');
//         const originalRequest = error.config;
//         const msg = error.response.data.msg;

//         if (error.response.status === 401 && !originalRequest._retry) {
//           if (msg === 'EXPIRED_TOKEN' || msg === 'INVALID_TOKEN') {
//             originalRequest._retry = true;

//             // 토큰 발행중일 경우 요청 대기
//             if (isTokenRefreshing) {
//               return new Promise(resolve => {
//                 addRefreshSubscriber((token: string) => {
//                   originalRequest.headers.Authorization = token;
//                   resolve(axiosPrivate(originalRequest));
//                 });
//               });
//             }

//             // AccessToken 재발행
//             const newAccessToken = await getRefreshToken();

//             if (typeof newAccessToken === 'string') {
//               sessionStorage.setItem('authorization', newAccessToken);

//               originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
//               return axiosPrivate(originalRequest);
//             }
//           }
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       axiosPrivate.interceptors.request.eject(requestInterceptor);
//       axiosPrivate.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

//   return axiosPrivate;
// };
