import { useQuery } from 'react-query';

import { fetchTeams } from '~/api/team';
import { QueryBaseOptions } from '~/types/query';
import { TeamData } from '~/types/team';

interface TeamQueryOptions<T> extends QueryBaseOptions<T> {
  userId?: string;
}

export const useTeamQuery = ({ userId, ...baseOptions }: TeamQueryOptions<TeamData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY];

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeams(userId), { ...baseOptions });

  const teams = data ? data : [];
  return { teams, isLoading, isError };
};
