import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createRequest, fetchRequest, removeRequest, updateRequest } from '~/api/common';
import { BaseResponse, FetchListResponse } from '~/types/common';
import { GroupData } from '~/types/group';

let groupQueryKey = 'group';
let groupRequestUrl = '/group/';

export interface GroupRequestBody {
  id?: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}

interface QueryProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useGroupQuery = ({ onSuccess, onError }: QueryProps = {}) => {
  const {
    data: groupRes,
    isLoading,
    isError,
  } = useQuery<FetchListResponse<GroupData>, AxiosError>(
    [groupQueryKey],
    fetchRequest<GroupData>(groupRequestUrl),
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

  const groups = groupRes?.result;
  return { groups, groupRes, isLoading, isError };
};

export const useGroupMutate = ({ onSuccess }: QueryProps = {}) => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries([groupQueryKey]);
    },
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createRequest<GroupRequestBody>(groupRequestUrl),
    options,
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    updateRequest<GroupRequestBody>(groupRequestUrl),
    options,
  );

  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    removeRequest(groupRequestUrl),
    options,
  );

  const isLoading = createLoading || updateLoading || removeLoading;

  return { isLoading, createMutate, updateMutate, removeMutate };
};
