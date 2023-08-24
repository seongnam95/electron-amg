import { atom } from 'recoil';

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      console.log('wls');
      const token = sessionStorage.getItem('authorization');
      setSelf(!!token);
    },
  ],
});
