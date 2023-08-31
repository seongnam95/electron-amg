import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createRequest, fetchRequest, removeRequest, updateRequest } from '~/api/common';
import { BaseResponse, FetchListResponse } from '~/types/common';
import { UserData } from '~/types/user';

let userQueryKey = 'user';
let userRequestUrl = '/user/';

export interface UserRequestBody {
  id?: string;
}

interface QueryProps {
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

export const useUserQuery = ({ enabled, onSuccess, onError }: QueryProps = {}) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<FetchListResponse<UserData>, AxiosError>(
    [userQueryKey],
    fetchRequest<UserData>(userRequestUrl),
    {
      enabled: enabled,
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const users = response?.result;
  return { users, response, isLoading, isError };
};

export const useUserMutate = ({ onSuccess }: QueryProps = {}) => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries([userQueryKey]);
    },
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createRequest<UserRequestBody>(userRequestUrl),
    options,
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    updateRequest<UserRequestBody>(userRequestUrl),
    options,
  );

  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    removeRequest(userRequestUrl),
    options,
  );

  const isLoading = createLoading || updateLoading || removeLoading;

  return { isLoading, createMutate, updateMutate, removeMutate };
};
