import { AxiosResponse } from 'axios';

import { PositionCreateBody, PositionData } from '~/types/position';

import axiosPrivate from './axios';
import { BaseResponse, DataListResponse, DataResponse } from './response';

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

export const createPosition = async (bodys: PositionCreateBody[]): Promise<PositionData[]> => {
  const unitEndpoint = import.meta.env.VITE_UNIT_ENDPOINT;
  const positionEndpoint = import.meta.env.VITE_POSITION_ENDPOINT;

  const createPromises = bodys.map(({ unitId, ...body }: PositionCreateBody) =>
    axiosPrivate.post<DataResponse<PositionData>, AxiosResponse<DataResponse<PositionData>>>(
      `${unitEndpoint}/${unitId}/${positionEndpoint}`,
      body,
    ),
  );

  const responses = await Promise.all(createPromises);
  return responses.map(response => response.data.result);
};
