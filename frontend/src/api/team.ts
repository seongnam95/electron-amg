import { TeamData } from '~/types/team';

import axiosPrivate from './axios';
import { FetchListResponse } from './response';

export const fetchTeams = (userId?: string) => async (): Promise<TeamData[]> => {
  const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
  const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

  const { data } = await axiosPrivate.get<FetchListResponse<TeamData>>(
    `${userEndpoint}/${userId}/${teamEndpoint}`,
  );
  return data.result.list;
};
