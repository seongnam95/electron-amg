import { AxiosResponse } from 'axios';

import { AttendanceCreateBody, AttendanceData, AttendanceUpdateBody } from '~/types/attendance';

import axiosPrivate from './axios';
import { BaseResponse, DataListResponse, DataResponse } from './response';

interface FetchAttendancesProps {
  id?: string;
  date?: string;
}

export const fetchAttendances =
  ({ id, date }: FetchAttendancesProps) =>
  async (): Promise<AttendanceData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

    const { data } = await axiosPrivate.get<DataListResponse<AttendanceData>>(
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
    axiosPrivate.put<DataResponse<AttendanceData>>(`${attendanceEndpoint}/${id}`, body),
  );

  const responses = await Promise.all(updatePromises);
  return responses.map(res => res.data.result);
};

export const createAttendance = async (
  bodys: AttendanceCreateBody[],
): Promise<AttendanceData[]> => {
  const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const updatePromises = bodys.map(body => {
    const url = `${employeeEndpoint}/${body.employeeId}/${attendanceEndpoint}`;
    return axiosPrivate.post<DataResponse<AttendanceData>>(url, body);
  });

  const responses = await Promise.all(updatePromises);
  return responses.map(res => res.data.result);
};

export const removeAttendance = async (ids: string[]): Promise<AttendanceData[]> => {
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const removePromises = ids.map(id => {
    return axiosPrivate.delete<DataResponse<AttendanceData>>(`${attendanceEndpoint}/${id}`);
  });

  const responses = await Promise.all(removePromises);
  return responses.map(res => res.data.result);
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
