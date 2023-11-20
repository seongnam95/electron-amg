import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { CurrentUser } from '~/types/user';

export const initUser: CurrentUser = {
  isLogin: false,
  user: {
    id: '',
    name: '',
    username: '',
    isAdmin: false,
    isApproved: false,
  },
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'userPersist',
  storage: sessionStorage,
});

export const userStore = atom<CurrentUser>({
  key: 'userState',
  default: initUser,
  effects_UNSTABLE: [persistAtom],
});
