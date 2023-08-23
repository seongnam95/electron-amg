import { useSetRecoilState } from 'recoil';

import amgApi from '~/api/apiClient';
import { initUser, userState } from '~/stores/user';

export const logout = () => {
  const setUser = useSetRecoilState(userState);
  setUser(initUser);
  sessionStorage.removeItem('authorization');
  amgApi.defaults.headers.common['authorization'] = '';
};
