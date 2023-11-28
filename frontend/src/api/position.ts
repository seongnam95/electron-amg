import { PositionData } from '~/types/position';

import axiosPrivate from './axios';
import { FetchListResponse } from './response';

interface FetchPositionsParams {
  teamId?: string;
  valid?: boolean;
}

export const fetchPositions =
  ({ teamId, ...params }: FetchPositionsParams) =>
  async (): Promise<FetchListResponse<PositionData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_POSITION_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchListResponse<PositionData>>(
      `${teamEndpoint}/${teamId}/${endpoint}`,
      { params },
    );

    return data;
  };
