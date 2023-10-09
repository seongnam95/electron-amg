import { WorklogCreateBody, WorklogUpdateBody } from '~/types/worklog';

import { BaseQueryOptions, baseMutation } from './useBaseQuery';

export const worklogKeys = {
  all: ['worklog'],
  byId: (worklogId: string) => [...worklogKeys.all, worklogId],
};

export const useWorklogMutation = (queryKey: string[], options?: BaseQueryOptions) => {
  const endpoint = import.meta.env.VITE_WORKLOG_API_URL;

  const { createMutate, updateMutate, removeMutate, isLoading } = baseMutation<
    WorklogCreateBody,
    WorklogUpdateBody
  >(queryKey, endpoint, options);

  return {
    isLoading,
    createWorklogMutate: createMutate,
    updateWorklogMutate: updateMutate,
    removeWorklogMutate: removeMutate,
  };
};
