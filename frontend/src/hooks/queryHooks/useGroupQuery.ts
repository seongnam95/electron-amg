import { useQuery } from 'react-query';

import { baseFetch } from '~/api/base';
import { GroupCreateBody, GroupData, GroupUpdateBody } from '~/types/group';

import {
  BaseMultiDataParams,
  BaseQueryOptions,
  QueryDefaultOptions,
  baseMutation,
} from './useBaseQuery';

export interface GroupQueryParams extends BaseMultiDataParams {}
export interface GroupQueryOptions extends BaseQueryOptions {
  groupId?: string;
  params?: GroupQueryParams;
}

export const groupKeys = {
  all: ['group'],
  byId: (groupId: string) => [...groupKeys.all, groupId],
};

export const useGroupQuery = ({ groupId, params, onSuccess, onError }: GroupQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_GROUP_API_URL;
  const queryKey = groupId ? groupKeys.byId(groupId) : groupKeys.all;

  const {
    data: response,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = useQuery(queryKey, baseFetch<GroupData, GroupQueryParams>(endpoint, groupId, params), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const groups = response ? response.result : [];
  return { response, groups, isGroupLoading, isGroupError };
};

export const useGroupMutation = (queryKey: string[], options?: QueryDefaultOptions) => {
  const endpoint = import.meta.env.VITE_GROUP_API_URL;

  const { createMutate, updateMutate, removeMutate, isLoading } = baseMutation<
    GroupCreateBody,
    GroupUpdateBody
  >(queryKey, endpoint, options);

  return {
    isLoading,
    createGroupMutate: createMutate,
    updateGroupMutate: updateMutate,
    removeGroupMutate: removeMutate,
  };
};
