import { AttendanceCreateBody, AttendanceData, AttendanceUpdateBody } from '~/types/attendance';

import axiosPrivate from './axios';
import { DataListResponse, DataResponse } from './response';

interface AttendancesFetchProps {
  teamId?: string;
  dateStr?: string;
}

/**
 * Attendance 불러오기 API (By Team)
 * @param AttendancesFetchProps
 * @returns Promise<AttendanceData[]>
 */
export const fetchAttendancesByTeam =
  ({ teamId, dateStr }: AttendancesFetchProps) =>
  async (): Promise<AttendanceData[]> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

    const { data } = await axiosPrivate.get<DataListResponse<AttendanceData>>(
      `${teamEndpoint}/${teamId}/${attendanceEndpoint}`,
      { params: { date: dateStr } },
    );

    return data.result.list;
  };

interface AttendanceAxiosProps<T> {
  employeeIds: string[];
  body: T;
}

/**
 * Attendance 생성 API
 * @param AttendanceAxiosProps
 * @returns Promise<AttendanceData[]>
 */
export const createAttendance = async ({
  employeeIds,
  body,
}: AttendanceAxiosProps<AttendanceCreateBody>): Promise<AttendanceData[]> => {
  const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const updatePromises = employeeIds.map(employeeId => {
    const url = `${employeeEndpoint}/${employeeId}/${attendanceEndpoint}`;
    return axiosPrivate.post<DataResponse<AttendanceData>>(url, body);
  });

  const responses = await Promise.all(updatePromises);
  return responses.map(res => res.data.result);
};

/**
 * Attendance 업데이트 API
 * @param AttendanceAxiosProps
 * @returns Promise<AttendanceData[]>
 */
export const updateAttendance = async ({
  employeeIds,
  body,
}: AttendanceAxiosProps<AttendanceUpdateBody>): Promise<AttendanceData[]> => {
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const updatePromises = employeeIds.map(employeeId =>
    axiosPrivate.put<DataResponse<AttendanceData>>(`${attendanceEndpoint}/${employeeId}`, body),
  );

  const responses = await Promise.all(updatePromises);
  return responses.map(res => res.data.result);
};

/**
 * Attendance 삭제 API
 * @param attendanceIds
 * @returns Promise<AttendanceData[]>
 */
export const removeAttendance = async (attendanceIds: string[]): Promise<AttendanceData[]> => {
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;

  const removePromises = attendanceIds.map(id => {
    return axiosPrivate.delete<DataResponse<AttendanceData>>(`${attendanceEndpoint}/${id}`);
  });

  const responses = await Promise.all(removePromises);
  return responses.map(res => res.data.result);
};
