import { useMutation, useQueryClient } from 'react-query';

import { createPosition } from '~/api/position';
import { PositionData } from '~/types/position';
import { QueryBaseOptions } from '~/types/query';

interface PositionQueryOptions<T> extends QueryBaseOptions<T> {
  userId?: string;
}

/**
 * Create Position
 */
export const usePositionCreateMutation = ({
  userId,
  ...baseOptions
}: PositionQueryOptions<PositionData[]>) => {
  const teamQueryKey: string[] = [import.meta.env.VITE_TEAM_QUERY_KEY, userId];
  const queryKey: string[] = [import.meta.env.VITE_POSITION_QUERY_KEY];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(teamQueryKey);

  const { mutate: createPositionMutate, isLoading: isCreatePositionLoading } = useMutation(
    queryKey,
    createPosition,
    { onSettled, ...baseOptions },
  );

  return { createPositionMutate, isCreatePositionLoading };
};
