import { AxiosResponse } from 'axios';

import { AttendanceData, AttendanceUpdateBody, EmployeeAttendanceData } from '~/types/attendance';

import axiosPrivate from './axios';
import { BaseResponse, FetchListResponse, FetchResponse } from './response';

interface FetchAttendancesProps {
  id?: string;
  date?: string;
}

export const fetchAttendances =
  ({ id, date }: FetchAttendancesProps) =>
  async (): Promise<EmployeeAttendanceData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchListResponse<EmployeeAttendanceData>>(
      `${teamEndpoint}/${id}/${attendanceEndpoint}`,
      { params: { date: date } },
    );

    return data.result.list;
  };

interface UpdateAttendanceProps {
  ids: string[];
  body: AttendanceUpdateBody;
}

export const updateAttendance = async ({
  ids,
  body,
}: UpdateAttendanceProps): Promise<AttendanceData[]> => {
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const updatePromises = ids.map(id =>
    axiosPrivate.put<FetchResponse<AttendanceData>>(`${attendanceEndpoint}/${id}`, body),
  );

  const responses = await Promise.all(updatePromises);
  return responses.map(res => res.data.result);
};

export const removeAttendanceRequest =
  (endpoint: string) =>
  async (id: string): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.delete<BaseResponse>(`${endpoint}/${id}`);
    return data;
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
