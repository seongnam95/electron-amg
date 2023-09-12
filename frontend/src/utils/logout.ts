import { useSetRecoilState } from 'recoil';

import axiosPrivate from '~/api/axios';
import { initUser, userState } from '~/stores/user';

export const logout = () => {
  const setUser = useSetRecoilState(userState);
  setUser(initUser);
  sessionStorage.removeItem('authorization');
  axiosPrivate.defaults.headers.common['authorization'] = '';
};
