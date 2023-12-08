import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  createAttendance,
  fetchAttendances,
  removeAttendance,
  updateAttendance,
} from '~/api/attendance';
import { AttendanceData } from '~/types/attendance';
import { QueryBaseOptions } from '~/types/query';

interface AttendanceQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
  date?: string;
  attendanceId?: string;
}

export const useAttendanceQuery = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, date];

  const { data, isLoading, isError } = useQuery(
    queryKey,
    fetchAttendances({ id: teamId, date: date }),
    { ...baseOptions },
  );

  const attendances = data ? data : [];
  const isEmpty = !attendances.length;
  return { attendances, isEmpty, isLoading, isError };
};

// 생성
export const useAttendanceCreate = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, date];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: createAttendanceCreate, isLoading: isCreateAttendanceLoading } = useMutation(
    queryKey,
    createAttendance,
    { onSettled, ...baseOptions },
  );

  return { createAttendanceCreate, isCreateAttendanceLoading };
};

// 업데이트
export const useAttendanceUpdate = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, date];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: updateAttendanceMutate, isLoading: isUpdateAttendanceLoading } = useMutation(
    queryKey,
    updateAttendance,
    { onSettled, ...baseOptions },
  );

  return { updateAttendanceMutate, isUpdateAttendanceLoading };
};

// 업데이트
export const useAttendanceRemove = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, date];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: removeAttendanceMutate, isLoading: isRemoveAttendanceLoading } = useMutation(
    queryKey,
    removeAttendance,
    { onSettled, ...baseOptions },
  );

  return { removeAttendanceMutate, isRemoveAttendanceLoading };
};
