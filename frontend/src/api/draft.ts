import { DraftCreateBody, DraftData } from '~/types/draft';

import axiosPrivate from './axios';
import { FetchListResponse, FetchResponse } from './response';

export const fetchDrafts =
  (teamId?: string) =>
  async <T extends FetchListResponse<DraftData>>(): Promise<DraftData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${teamEndpoint}/${teamId}/${draftEndpoint}`);

    return data.result.list;
  };

export const createDraft =
  (teamId?: string) =>
  async (body: DraftCreateBody): Promise<DraftData> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

    const { data } = await axiosPrivate.post<FetchResponse<DraftData>>(
      `${teamEndpoint}/${teamId}/${draftEndpoint}`,
      body,
    );

    return data.result;
  };

export const removeDraft = async (draftId?: string): Promise<DraftData> => {
  const endpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

  const { data } = await axiosPrivate.delete<FetchResponse<DraftData>>(`${endpoint}/${draftId}`);

  return data.result;
};
