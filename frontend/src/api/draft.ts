import { DraftCreateBody, DraftData } from '~/types/draft';

import axiosPrivate from './axios';
import { FetchListResponse, FetchResponse } from './response';

export const fetchDraftsByTeam =
  (teamId?: string) =>
  async <T extends FetchListResponse<DraftData>>(): Promise<T> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${teamEndpoint}/${teamId}/${draftEndpoint}`);
    return data;
  };

export const createDraftByTeam =
  (teamId?: string) =>
  async (body: DraftCreateBody): Promise<FetchResponse<DraftData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;
    console.log(body);
    const { data } = await axiosPrivate.post<FetchResponse<DraftData>>(
      `${teamEndpoint}/${teamId}/${draftEndpoint}`,
      body,
    );
    return data;
  };
