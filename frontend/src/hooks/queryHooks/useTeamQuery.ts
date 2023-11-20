import { useQuery } from 'react-query';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchTeams } from '~/api/team';
import { teamStore } from '~/stores/team';
import { QueryBaseOptions } from '~/types/query';
import { TeamData } from '~/types/team';

interface TeamQueryOptions<T> extends QueryBaseOptions<T> {
  userId?: string;
}

export const useTeamQuery = ({ userId, ...baseOptions }: TeamQueryOptions<TeamData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY];
  const [team, setTeam] = useRecoilState(teamStore);

  const onSuccess = (teams: TeamData[]) => {
    if (team.id === '') setTeam(teams[0]);
    baseOptions.onSuccess?.(teams);
  };

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeams(userId), {
    onSuccess: onSuccess,
    ...baseOptions,
  });

  const teams = data ? data : [];
  return { teams, isLoading, isError };
};
