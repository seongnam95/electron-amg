import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { createRequest, fetchRequest, removeRequest, updateRequest } from '~/api/common';
import { FetchListResponse } from '~/types/common';

export interface GroupRequestBody {
  id: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}

interface QueryProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useEasyQuery = <T>(
  queryKey: string[],
  url: string,
  { onSuccess, onError }: QueryProps = {},
) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<FetchListResponse<T>, AxiosError>(queryKey, fetchRequest<T>(url), {
    onSuccess: onSuccess,
    onError: onError,
  });
  const data = response?.result;
  return { data, response, isLoading, isError };
};

export const useEasyMutation = <T extends { id: string }>(
  queryKey: string[],
  url: string,
  { onSuccess }: QueryProps = {},
) => {
  const queryClient = useQueryClient();
  const options = {
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries(queryKey);
    },
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    createRequest<T>(url),
    options,
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    updateRequest<T>(url),
    options,
  );

  const { mutate: removeMutate, isLoading: removeLoading } = useMutation(
    removeRequest(url),
    options,
  );

  const isLoading = createLoading || updateLoading || removeLoading;

  return { isLoading, createMutate, updateMutate, removeMutate };
};
