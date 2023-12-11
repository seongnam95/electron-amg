import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { loginUser } from '~/api/auth';
import { BaseResponse } from '~/api/response';
import { userStore } from '~/stores/user';
import { UserData } from '~/types/user';

import { useSoundApp } from './useSoundApp';

interface AuthMutateOptions {
  onSuccess?: (user: UserData) => void;
  onError?: (response: AxiosError<BaseResponse>) => void;
}

export const useAuth = ({ onSuccess, onError }: AuthMutateOptions) => {
  const setUser = useSetRecoilState(userStore);

  const { mutate: loginMutate, isLoading } = useMutation(['auth'], loginUser, {
    onSuccess: response => {
      const accessToken = response.headers['authorization'];
      sessionStorage.setItem('authorization', accessToken);

      const user: UserData = { isLogin: true, ...response.data };
      setUser(user);

      onSuccess?.(user);
    },
    onError,
  });

  return { loginMutate, isLoading };
};
