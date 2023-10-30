import { TeamData } from '~/types/team';

import axiosPrivate from './axios';
import { FetchResponse } from './response';

export const fetchTeam =
  (userId?: string) =>
  async <T extends FetchResponse<TeamData>>(): Promise<T> => {
    const parentEndpoint = import.meta.env.VITE_USER_ENDPOINT;
    const endpoint = import.meta.env.VITE_TEAM_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${parentEndpoint}/${userId}/${endpoint}`);
    return data;
  };
