import { useQuery } from 'react-query';

import { fetchTeamsByUser } from '~/api/team';
import { BaseQueryOptions } from '~/types/query';

interface TeamQueryOptions extends BaseQueryOptions {
  userId: string;
}

export const useTeamQuery = ({ userId, onSuccess, onError }: TeamQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY];

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeamsByUser(userId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const teams = data ? data.result.list : [];
  return { teams, isLoading, isError };
};
