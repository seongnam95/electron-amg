import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createDraft, fetchDrafts, removeDraft } from '~/api/draft';
import { BaseQueryOptions, QueryDefaultOptions } from '~/types/query';

interface DraftQueryOptions extends BaseQueryOptions {
  teamId: string;
}

export const useDraftQuery = ({ teamId, onSuccess, onError }: DraftQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchDrafts(teamId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const drafts = data ? data.result.list : [];
  return { drafts, isLoading, isError };
};

export const useDraftCreate = ({ teamId, onSuccess, onError }: DraftQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY];
  const queryClient = useQueryClient();

  const { mutate: createDraftMutate, isLoading: isDraftCreateLoading } = useMutation(
    queryKey,
    createDraft(teamId),
    {
      onSuccess: onSuccess,
      onError: onError,
      onSettled: () => queryClient.invalidateQueries(queryKey),
    },
  );

  return { createDraftMutate, isDraftCreateLoading };
};

export const useDraftRemove = ({ onSuccess, onError }: QueryDefaultOptions = {}) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY];
  const queryClient = useQueryClient();

  const { mutate: removeDraftMutate, isLoading: isDraftRemoveLoading } = useMutation(
    queryKey,
    removeDraft(),
    {
      onSuccess: onSuccess,
      onError: onError,
      onSettled: () => queryClient.invalidateQueries(queryKey),
    },
  );

  return { removeDraftMutate, isDraftRemoveLoading };
};
