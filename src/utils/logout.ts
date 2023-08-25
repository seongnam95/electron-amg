import { useSetRecoilState } from 'recoil';

import authAxios from '~/api/apiClient';
import { initUser, userState } from '~/stores/user';

export const logout = () => {
  const setUser = useSetRecoilState(userState);
  setUser(initUser);
  sessionStorage.removeItem('authorization');
  authAxios.defaults.headers.common['authorization'] = '';
};
