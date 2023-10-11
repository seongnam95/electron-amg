import { useMutation, useQueryClient } from 'react-query';

import { createRequest, removeRequest, updateRequest } from '~/api/base';

export interface BaseMultiDataParams {
  skip?: number;
  limit?: number;
}

/** Create, Put, Remove Request Options */
export interface QueryDefaultOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

/** Fetch Request Options */
export interface BaseQueryOptions<T = BaseMultiDataParams> extends QueryDefaultOptions {
  params?: T;
  enabled?: boolean;
}

/**
 *
 * @param queryKey 쿼리 키 값입니다.
 * @param url 요청할 URL 입니다.
 */
export const baseMutation = <TCreate, TUpdate>(
  queryKey: string[],
  url: string,
  options?: BaseQueryOptions,
) => {
  const queryClient = useQueryClient();

  const initOptions: BaseQueryOptions = {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      if (options?.onSuccess) options.onSuccess();
    },
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createRequest<TCreate>(url),
    initOptions,
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    updateRequest<TUpdate>(url),
    initOptions,
  );

  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    removeRequest(url),
    initOptions,
  );

  const isLoading = createLoading || updateLoading || removeLoading;

  return { isLoading, createMutate, updateMutate, removeMutate, initOptions };
};
