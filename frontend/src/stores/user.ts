import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { UserData } from '~/types/user';

export const initUser: UserData = {
  id: '',
  name: '',
  username: '',
  isLogin: false,
  isAdmin: false,
  isApproved: false,
  hasTeam: false,
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'userPersist',
  storage: sessionStorage,
});

export const userStore = atom<UserData>({
  key: 'userState',
  default: initUser,
  effects_UNSTABLE: [persistAtom],
});
