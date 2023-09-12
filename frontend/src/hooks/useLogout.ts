import { useSetRecoilState } from 'recoil';

import axiosPrivate from '~/api/axios';
import { initUser, userState } from '~/stores/user';

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);

  const logout = () => {
    setUser(initUser);
    sessionStorage.clear();
    axiosPrivate.defaults.headers.common['authorization'] = '';
    // TODO : Refresh-Token Cookie 제거
  };

  return logout;
};
