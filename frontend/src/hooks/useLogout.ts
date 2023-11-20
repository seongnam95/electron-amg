import { useSetRecoilState } from 'recoil';

import axiosPrivate from '~/api/axios';
import { initUser, userStore } from '~/stores/user';

export const useLogout = () => {
  const setUser = useSetRecoilState(userStore);

  const logout = () => {
    setUser(initUser);
    sessionStorage.clear();
    axiosPrivate.defaults.headers.common['authorization'] = '';
    // TODO : Refresh-Token Cookie 제거
  };

  return logout;
};
