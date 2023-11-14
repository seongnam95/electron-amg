import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createDraft, fetchDrafts, removeDraft } from '~/api/draft';
import { DraftData } from '~/types/draft';
import { QueryBaseOptions } from '~/types/query';

interface DraftQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
}

/**
 * Fetch List
 */
export const useDraftQuery = ({ teamId, ...baseOptions }: DraftQueryOptions<DraftData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_DRAFT_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchDrafts(teamId), { ...baseOptions });

  const drafts = data ? data.toReversed() : [];
  return { drafts, isLoading, isError };
};

/**
 * Create Draft
 */
export const useDraftCreateMutation = ({
  teamId,
  ...baseOptions
}: DraftQueryOptions<DraftData>) => {
  const queryKey: string[] = [import.meta.env.VITE_DRAFT_QUERY_KEY, teamId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: createDraftMutate, isLoading: isCreateDraftLoading } = useMutation(
    queryKey,
    createDraft(teamId),
    { onSettled, ...baseOptions },
  );

  return { createDraftMutate, isCreateDraftLoading };
};

/**
 * Remove Draft
 */
export const useDraftRemoveMutation = ({ teamId, onSuccess }: DraftQueryOptions<DraftData>) => {
  const queryKey: string[] = [import.meta.env.VITE_DRAFT_QUERY_KEY, teamId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  // 삭제 Mutate 핸들러
  const handleRemoveMutate = (value: string) => {
    const oldDraftData = queryClient.getQueryData<Array<DraftData>>(queryKey);

    if (oldDraftData) {
      // 쿼리 취소
      queryClient.cancelQueries(queryKey);

      // 대상 Draft를 제외한 리스트를 쿼리 데이터에 저장
      queryClient.setQueryData(queryKey, (drafts: DraftData[] | undefined) => {
        return drafts ? drafts.filter(draft => draft.id.toString() !== value) : oldDraftData;
      });

      // 에러 시, 롤백 할 함수
      return () => queryClient.setQueryData(queryKey, oldDraftData);
    }
  };

  const { mutate: removeDraftMutate, isLoading: isRemoveDraftLoading } = useMutation(
    queryKey,
    removeDraft,
    {
      onSettled,
      onSuccess,
      onMutate: handleRemoveMutate,
      onError: ({ rollback }) => {
        if (rollback) rollback();
      },
    },
  );

  return { removeDraftMutate, isRemoveDraftLoading };
};
