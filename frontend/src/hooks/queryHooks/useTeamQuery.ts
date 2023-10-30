import { useQuery } from 'react-query';

import { fetchTeam } from '~/api/team';
import { BaseQueryOptions } from '~/types/query';

interface TeamQueryOptions extends BaseQueryOptions {
  teamId: string;
}

export const useTeamQuery = ({ teamId, onSuccess, onError }: TeamQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeam(teamId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const team = data?.result;
  return { team, isLoading, isError };
};
