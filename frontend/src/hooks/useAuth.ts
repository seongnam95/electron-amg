import { useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser, logoutUser } from '~/api/auth';
import { BaseResponse } from '~/api/response';
import { initTeamValue, teamStore } from '~/stores/team';
import { initUser, userStore } from '~/stores/user';
import { UserData } from '~/types/user';

interface AuthMutateOptions {
  onSuccess?: (user: UserData) => void;
  onError?: (response: AxiosError<BaseResponse>) => void;
}

export const useAuth = ({ onSuccess, onError }: AuthMutateOptions) => {
  const setUser = useSetRecoilState(userStore);
  const setTeam = useSetRecoilState(teamStore);

  const queryClient = useQueryClient();

  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
    ['auth', 'login'],
    loginUser,
    {
      onSuccess: response => {
        const accessToken = response.headers['authorization'];
        sessionStorage.setItem('authorization', accessToken);

        const user: UserData = { isLogin: true, ...response.data };
        setUser(user);

        onSuccess?.(user);
      },
      onError,
    },
  );

  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useMutation(
    ['auth', 'logout'],
    logoutUser,
    {
      onSuccess: () => {
        sessionStorage.removeItem('authorization');
        setUser(initUser);
        setTeam(initTeamValue);
        queryClient.clear();
        onSuccess?.(initUser);
      },
      onError,
    },
  );

  return { loginMutate, logoutMutate, isLoginLoading, isLogoutLoading };
};
