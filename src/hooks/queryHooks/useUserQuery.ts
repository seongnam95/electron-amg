import { useQuery } from 'react-query';

import { baseFetch } from '~/api/base';
import { UserCreateBody, UserData, UserUpdateBody } from '~/types/user';

import { BaseQueryOptions, QueryDefaultOptions, useBaseMutation } from './useBaseQuery';

export interface UserQueryOptions extends BaseQueryOptions {
  userId?: string;
}

export const userKeys = {
  all: ['user'],
  byId: (userId: string) => [...userKeys.all, userId],
};

export const useUserQuery = ({ userId, params, onSuccessCb, onErrorCb }: UserQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_USER_API_URL;
  const queryKey = userId ? userKeys.byId(userId) : userKeys.all;

  const {
    data: response,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(queryKey, baseFetch<UserData>(endpoint, userId, params), {
    onSuccess: onSuccessCb,
    onError: onErrorCb,
  });

  const users = response ? response.result : [];
  return { response, users, isUserLoading, isUserError };
};

export const useUserMutation = (queryKey: string[], options?: QueryDefaultOptions) => {
  const endpoint = import.meta.env.VITE_WORKER_API_URL;

  const { createMutate, updateMutate, removeMutate, isLoading } = useBaseMutation<
    UserCreateBody,
    UserUpdateBody
  >(queryKey, endpoint, options);

  return {
    isLoading,
    createUserMutate: createMutate,
    updateUserMutate: updateMutate,
    removeUserMutate: removeMutate,
  };
};
