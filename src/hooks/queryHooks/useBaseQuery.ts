import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createRequest, fetchAllRequest, removeRequest, updateRequest } from '~/api/base';
import { FetchListResponse } from '~/types/response';

export interface BaseMultiDataParams {
  skip?: number;
  limit?: number;
}

export interface QueryDefaultOptions {
  onSuccessCb?: () => void;
  onErrorCb?: () => void;
}

export interface BaseQueryOptions<T = BaseMultiDataParams> extends QueryDefaultOptions {
  params?: T;
  enabled?: boolean;
}

/**
 * 커스텀 useQuery Hook 입니다.
 * @param queryKey 쿼리 키 값입니다.
 * @param url 요청할 URL 입니다.
 */
export const useBaseQuery = <T>(
  queryKey: any,
  url: string,
  { enabled, onSuccessCb, onErrorCb }: BaseQueryOptions = {},
) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<FetchListResponse<T>, AxiosError>(queryKey, fetchAllRequest<T>(url), {
    enabled: enabled,
    onSuccess: onSuccessCb,
    onError: onErrorCb,
  });
  return { response, isLoading, isError };
};

/**
 *
 * @param queryKey 쿼리 키 값입니다.
 * @param url 요청할 URL 입니다.
 */
export const useBaseMutation = <TCreate, TUpdate>(
  queryKey: string[],
  url: string,
  { onSuccessCb }: BaseQueryOptions = {},
) => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      onSuccessCb?.();
      queryClient.invalidateQueries(queryKey);
    },
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createRequest<TCreate>(url),
    options,
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    updateRequest<TUpdate>(url),
    options,
  );

  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    removeRequest(url),
    options,
  );

  const isLoading = createLoading || updateLoading || removeLoading;

  return { isLoading, createMutate, updateMutate, removeMutate };
};
