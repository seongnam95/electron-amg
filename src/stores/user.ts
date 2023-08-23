import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { fetchUsers } from '~/api/userApi';
import { UserData } from '~/types/user';

export const initUser: UserData = {
  id: '',
  name: '',
  isAdmin: false,
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'userPersist',
  storage: sessionStorage,
});

export const userState = atom<UserData>({
  key: 'userState',
  default: initUser,
  effects_UNSTABLE: [persistAtom],
});

export const userListState = atom<UserData[]>({
  key: 'userListState',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      fetchUsers().then(response => {
        if (response.success) {
          const users = response.result.map(mapUserDataFromResponse);
          setSelf(users);
        }
      });
    },
  ],
});

const mapUserDataFromResponse = (user: any): UserData => ({
  id: user.id.toString(),
  name: user.name,
  isAdmin: user.is_admin,
});
