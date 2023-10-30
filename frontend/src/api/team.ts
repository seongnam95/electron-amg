import { TeamWithEmployee } from '~/types/team';

import axiosPrivate from './axios';
import { FetchResponse } from './response';

export const fetchTeam =
  (teamId?: string) =>
  async <T extends FetchResponse<TeamWithEmployee>>(): Promise<T> => {
    const endpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const { data } = await axiosPrivate.get<T>(`${endpoint}/${teamId}`);
    return data;
  };
