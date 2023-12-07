import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useRecoilState } from 'recoil';

import { createTeam, fetchTeams, updateTeam } from '~/api/team';
import { initTeamValue, teamStore } from '~/stores/team';
import { QueryBaseOptions } from '~/types/query';
import { TeamData } from '~/types/team';

interface TeamQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
  userId?: string;
}

export const useTeamQuery = ({ userId, ...baseOptions }: TeamQueryOptions<TeamData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_TEAM_QUERY_KEY, userId];
  const [team, setTeam] = useRecoilState(teamStore);

  const onSuccess = (teams: TeamData[]) => {
    if (teams.length === 0) setTeam({ ...initTeamValue, existTeam: false });
    else if (team.id === '') setTeam({ ...teams[0], existTeam: true });
    baseOptions.onSuccess?.(teams);
  };

  const { data, isLoading, isError } = useQuery(queryKey, fetchTeams(userId), {
    onSuccess: onSuccess,
    ...baseOptions,
  });

  const teams = data ? data : [];
  const isEmptyTeam = teams.length === 0;
  return { teams, isEmptyTeam, isLoading, isError };
};

/**
 * Create Team
 */
export const useTeamCreateMutation = ({ userId, ...baseOptions }: TeamQueryOptions<TeamData>) => {
  const queryKey: string[] = [import.meta.env.VITE_TEAM_QUERY_KEY, userId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: createTeamMutate, isLoading: isCreateTeamLoading } = useMutation(
    queryKey,
    createTeam(userId),
    { onSettled, ...baseOptions },
  );

  return { createTeamMutate, isCreateTeamLoading };
};

/**
 * Update Team
 */
export const useTeamUpdateMutation = ({
  teamId,
  userId,
  ...baseOptions
}: TeamQueryOptions<TeamData>) => {
  const queryKey: string[] = [import.meta.env.VITE_TEAM_QUERY_KEY, userId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: updateTeamMutate, isLoading: isUpdateTeamLoading } = useMutation(
    queryKey,
    updateTeam(teamId),
    { onSettled, ...baseOptions },
  );

  return { updateTeamMutate, isUpdateTeamLoading };
};
