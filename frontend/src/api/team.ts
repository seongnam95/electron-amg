import { TeamData } from '~/types/team';

import axiosPrivate from './axios';
import { FetchListResponse } from './response';

export const fetchTeamsByUser =
  (userId?: string) =>
  async <T extends FetchListResponse<TeamData>>(): Promise<T> => {
    const userEndpoint = import.meta.env.VITE_USER_ENDPOINT;
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${userEndpoint}/${userId}/${teamEndpoint}`);
    return data;
  };
