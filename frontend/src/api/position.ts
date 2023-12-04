import { PositionData } from '~/types/position';

import axiosPrivate from './axios';
import { DataListResponse } from './response';

interface FetchPositionsParams {
  teamId?: string;
  valid?: boolean;
}

export const fetchPositions =
  ({ teamId, ...params }: FetchPositionsParams) =>
  async (): Promise<DataListResponse<PositionData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_POSITION_ENDPOINT;

    const { data } = await axiosPrivate.get<DataListResponse<PositionData>>(
      `${teamEndpoint}/${teamId}/${endpoint}`,
      { params },
    );

    return data;
  };
