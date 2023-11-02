import { DraftCreateBody, DraftData } from '~/types/draft';

import axiosPrivate from './axios';
import { BaseResponse, FetchListResponse, FetchResponse } from './response';

export const fetchDrafts =
  (teamId?: string) =>
  async <T extends FetchListResponse<DraftData>>(): Promise<T> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${teamEndpoint}/${teamId}/${draftEndpoint}`);
    return data;
  };

export const createDraft =
  (teamId?: string) =>
  async (body: DraftCreateBody): Promise<FetchResponse<DraftData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;

    const { data } = await axiosPrivate.post<FetchResponse<DraftData>>(
      `${teamEndpoint}/${teamId}/${draftEndpoint}`,
      body,
    );
    return data;
  };

export const removeDraft =
  () =>
  async (draftId?: string): Promise<BaseResponse> => {
    const draftEndpoint = import.meta.env.VITE_DRAFT_ENDPOINT;
    const { data } = await axiosPrivate.delete<BaseResponse>(`${draftEndpoint}/${draftId}`);
    return data;
  };
