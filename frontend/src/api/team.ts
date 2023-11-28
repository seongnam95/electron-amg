import { TeamCreateBody, TeamData, TeamUpdateBody } from '~/types/team';

import axiosPrivate from './axios';
import { FetchListResponse, FetchResponse } from './response';

export const fetchTeams = (userId?: string) => async (): Promise<TeamData[]> => {
  const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
  const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

  const { data } = await axiosPrivate.get<FetchListResponse<TeamData>>(
    `${userEndpoint}/${userId}/${teamEndpoint}`,
  );

  return data.result.list;
};

export const createTeam =
  (userId?: string) =>
  async (body: TeamCreateBody): Promise<TeamData> => {
    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

    const { data } = await axiosPrivate.post<FetchResponse<TeamData>>(
      `${userEndpoint}/${userId}/${teamEndpoint}`,
      body,
    );

    return data.result;
  };

export const updateTeam =
  (teamId?: string) =>
  async (body: TeamUpdateBody): Promise<TeamData> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const { data } = await axiosPrivate.put<FetchResponse<TeamData>>(
      `${teamEndpoint}/${teamId}`,
      body,
    );
    return data.result;
  };
