import { useQuery } from 'react-query';

import { FetchListResponse } from '~/api/response';
import { fetchTeamsByUser } from '~/api/team';
import { BaseQueryOptions } from '~/types/query';
import { TeamData } from '~/types/team';

interface TeamQueryOptions extends BaseQueryOptions<FetchListResponse<TeamData>> {
  userId?: string;
}

export const useTeamQuery = ({ userId, ...baseOptions }: TeamQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY];

  const {
    data,
    isLoading: isTeamLoading,
    isError,
  } = useQuery(queryKey, fetchTeamsByUser(userId), { ...baseOptions });

  const teams = data ? data.result.list : [];
  return { teams, isTeamLoading, isError };
};
