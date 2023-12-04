import { TeamCreateBody, TeamData, TeamUpdateBody } from '~/types/team';

import axiosPrivate from './axios';
import { DataListResponse, DataResponse } from './response';

export const fetchTeams = (userId?: string) => async (): Promise<TeamData[]> => {
  const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
  const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

  const { data } = await axiosPrivate.get<DataListResponse<TeamData>>(
    `${userEndpoint}/${userId}/${teamEndpoint}`,
  );

  console.log('fetchTeams, data', data.result.list);
  return data.result.list;
};

export const createTeam =
  (userId?: string) =>
  async (body: TeamCreateBody): Promise<TeamData> => {
    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

    const { data } = await axiosPrivate.post<DataResponse<TeamData>>(
      `${userEndpoint}/${userId}/${teamEndpoint}`,
      body,
    );

    return data.result;
  };

export const updateTeam =
  (teamId?: string) =>
  async (body: TeamUpdateBody): Promise<TeamData> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const { data } = await axiosPrivate.put<DataResponse<TeamData>>(
      `${teamEndpoint}/${teamId}`,
      body,
    );
    return data.result;
  };
