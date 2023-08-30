import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createGroup, fetchGroups, removeGroup, updateGroup } from '~/api/group';
import { FetchListResponse } from '~/types/common';
import { GroupData } from '~/types/group';

interface QueryProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useGroupQuery = ({ onSuccess }: QueryProps = {}) => {
  const {
    data: groupRes,
    isLoading,
    isError,
  } = useQuery<FetchListResponse<GroupData>, AxiosError>(['group'], fetchGroups, {
    onSuccess: onSuccess,
  });
  const groups = groupRes?.result;
  return { groups, groupRes, isLoading, isError };
};

export const useGroupMutate = ({ onSuccess, onError }: QueryProps = {}) => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries();
    },
    onError: () => onError?.(),
  };

  const { mutate: createMutate } = useMutation(createGroup, options);
  const { mutate: updateMutate } = useMutation(updateGroup, options);
  const { mutate: removeMutate } = useMutation(removeGroup, options);

  return { createMutate, updateMutate, removeMutate };
};
