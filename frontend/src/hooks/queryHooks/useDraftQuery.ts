import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createDraftByTeam, fetchDraftsByTeam } from '~/api/draft';
import { DraftCreateBody } from '~/types/draft';
import { BaseQueryOptions } from '~/types/query';

interface DraftQueryOptions extends BaseQueryOptions {
  teamId: string;
}

export const useDraftQuery = ({ teamId, onSuccess, onError }: DraftQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY];

  const { data, isLoading, isError } = useQuery(queryKey, fetchDraftsByTeam(teamId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const drafts = data ? data.result.list : [];
  return { drafts, isLoading, isError };
};

export const useDraftMutation = ({ teamId, onSuccess, onError }: DraftQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY];
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(queryKey, createDraftByTeam(teamId), {
    onSuccess: onSuccess,
    onError: onError,
    onSettled: () => queryClient.invalidateQueries(queryKey),
  });

  return { mutate, isLoading };
};
