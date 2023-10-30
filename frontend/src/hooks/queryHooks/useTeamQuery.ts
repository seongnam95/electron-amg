import { useQuery } from 'react-query';

import { FetchListParams } from '~/api/response';
import { fetchTeam } from '~/api/team';

import { BaseQueryOptions } from './base';

export const useTeamQuery = ({
  params,
  onSuccess,
  onError,
}: BaseQueryOptions<FetchListParams> = {}) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY];

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeam(params), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const response = data?.result;
  const teams = data ? data.result.list.toReversed() : [];

  return { response, teams, isLoading, isError };
};
