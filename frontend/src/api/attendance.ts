import { AttendanceData } from '~/types/attendance';
import { BaseResponse } from '~/types/response';

import axiosPrivate from './axios';

export type AttendanceCreateBody = Omit<AttendanceData, 'id' | 'workingDate'> & {
  workingDate?: string;
};

export interface CreateAttendanceProps {
  employeeId: string;
  body: AttendanceCreateBody;
}

export const createAttendanceRequest =
  (parentEndpoint: string, endpoint: string) =>
  async ({ employeeId, body }: CreateAttendanceProps): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.post<BaseResponse>(
      `${parentEndpoint}/${employeeId}/${endpoint}`,
      body,
    );
    return data;
  };

export const removeAttendanceRequest =
  (endpoint: string) =>
  async (id: string): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.delete<BaseResponse>(`${endpoint}/${id}`);
    return data;
  };
