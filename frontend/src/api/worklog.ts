import { BaseResponse } from '~/types/response';
import { WorkLogCreateBody } from '~/types/worklog';

import axiosPrivate from './axios';

interface CreateWorkLogInterface {
  employeeId: string;
  body: WorkLogCreateBody;
}

export const createWorkLog =
  (employeeUrl: string, url: string) =>
  async ({ employeeId, body }: CreateWorkLogInterface): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.post<BaseResponse>(
      `${employeeUrl}/${employeeId}${url}`,
      body,
    );
    return data;
  };

export const removeWorkLog =
  (url: string) =>
  async ({ employeeId, body }: CreateWorkLogInterface): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.post<BaseResponse>(`${employeeId}${url}`, body);
    return data;
  };
