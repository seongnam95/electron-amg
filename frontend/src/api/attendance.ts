import { EmployeeAttendanceData } from '~/types/attendance';

import axiosPrivate from './axios';
import { FetchListResponse } from './response';

export const fetchAttendances =
  ({ teamId, date }: { teamId?: string; date?: string }) =>
  async (): Promise<EmployeeAttendanceData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchListResponse<EmployeeAttendanceData>>(
      `${teamEndpoint}/${teamId}/${attendanceEndpoint}`,
      { params: { date: date } },
    );

    return data.result.list;
  };

// export const createAttendanceRequest =
//   (parentEndpoint: string, endpoint: string) =>
//   async ({ employeeId, body }: CreateAttendanceProps): Promise<BaseResponse> => {
//     const { data } = await axiosPrivate.post<BaseResponse>(
//       `${parentEndpoint}/${employeeId}/${endpoint}`,
//       body,
//     );
//     return data;
//   };

// export const removeAttendanceRequest =
//   (endpoint: string) =>
//   async (id: string): Promise<BaseResponse> => {
//     const { data } = await axiosPrivate.delete<BaseResponse>(`${endpoint}/${id}`);
//     return data;
//   };
