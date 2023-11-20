import { useSetRecoilState } from 'recoil';

import axiosPrivate from '~/api/axios';
import { initUser, userStore } from '~/stores/user';

export const logout = () => {
  const setUser = useSetRecoilState(userStore);
  setUser(initUser);
  sessionStorage.removeItem('authorization');
  axiosPrivate.defaults.headers.common['authorization'] = '';
};
