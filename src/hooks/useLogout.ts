import { useSetRecoilState } from 'recoil';

import authAxios from '~/api/apiClient';
import { initUser, userState } from '~/stores/user';

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);

  const logout = () => {
    setUser(initUser);
    sessionStorage.clear();
    authAxios.defaults.headers.common['authorization'] = '';
    // TODO : Refresh-Token Cookie 제거
  };

  return logout;
};
