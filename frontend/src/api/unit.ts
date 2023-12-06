import { UnitData } from '~/types/unit';

import axiosPrivate from './axios';
import { DataListResponse } from './response';

interface FetchUnitsParams {
  teamId?: string;
}

export const fetchUnits =
  ({ teamId, ...params }: FetchUnitsParams) =>
  async (): Promise<UnitData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_UNIT_ENDPOINT;

    const { data } = await axiosPrivate.get<DataListResponse<UnitData>>(
      `${teamEndpoint}/${teamId}/${endpoint}`,
      { params },
    );

    return data.result.list;
  };
