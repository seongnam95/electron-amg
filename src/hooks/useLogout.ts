import { useSetRecoilState } from 'recoil';

import amgApi from '~/api/apiClient';
import { initUser, userState } from '~/stores/user';

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);

  const logout = () => {
    setUser(initUser);
    sessionStorage.clear;
    amgApi.defaults.headers.common['authorization'] = '';
  };

  return logout;
};
