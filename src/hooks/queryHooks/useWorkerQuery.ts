import { useMutation, useQuery, useQueryClient } from 'react-query';

import { baseFetch } from '~/api/base';
import { workerMoveGroupRequest } from '~/api/group';
import { WorkerCreateBody, WorkerData, WorkerUpdateBody } from '~/types/worker';

import {
  BaseMultiDataParams,
  BaseQueryOptions,
  QueryDefaultOptions,
  useBaseMutation,
} from './useBaseQuery';

export interface WorkerQueryParams extends BaseMultiDataParams {
  groupId?: string;
}

export interface WorkerQueryOptions extends BaseQueryOptions {
  workerId?: string;
  groupId?: string;
  params?: WorkerQueryParams;
}

export const workerKeys = {
  all: ['worker'],
  byId: (workerId: string) => [...workerKeys.all, workerId],
  byGroup: (groupId: string) => [...workerKeys.all, 'group', groupId],
};

export const useWorkerQuery = ({
  workerId,
  groupId,
  params,
  onSuccessCb,
  onErrorCb,
}: WorkerQueryOptions = {}) => {
  const isUnaffiliated = groupId === 'etc';
  const baseEndpoint = import.meta.env.VITE_WORKER_API_URL;
  const endpoint = isUnaffiliated ? `${baseEndpoint}unaffiliated/` : baseEndpoint;

  const queryKey = workerId
    ? workerKeys.byId(workerId)
    : groupId
    ? workerKeys.byGroup(groupId)
    : workerKeys.all;

  const newParams: WorkerQueryParams = {
    ...params,
    groupId: !isUnaffiliated ? groupId : undefined,
  };

  const {
    data: response,
    isLoading: isWorkerLoading,
    isError: isWorkerError,
  } = useQuery(queryKey, baseFetch<WorkerData, WorkerQueryParams>(endpoint, workerId, newParams), {
    onSuccess: onSuccessCb,
    onError: onErrorCb,
  });

  const workers = response ? response.result : [];
  return { response, workers, isWorkerLoading, isWorkerError };
};

export const useWorkerMutation = (
  queryKey: string[],
  { onSuccessCb, onErrorCb }: QueryDefaultOptions = {},
) => {
  const endpoint = import.meta.env.VITE_WORKER_API_URL;

  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      onSuccessCb?.();
    },
    onError: onErrorCb,
  };

  const {
    createMutate,
    updateMutate,
    removeMutate,
    isLoading: baseLoading,
  } = useBaseMutation<WorkerCreateBody, WorkerUpdateBody>(queryKey, endpoint);

  const { mutate: groupMoveMutate, isLoading: groupMoveLoading } = useMutation(
    workerMoveGroupRequest,
    options,
  );

  const isLoading = baseLoading || groupMoveLoading;

  return {
    isLoading,
    createWorkerMutate: createMutate,
    updateWorkerMutate: updateMutate,
    removeWorkerMutate: removeMutate,
    groupMoveMutate,
  };
};
