import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  createAttendance,
  fetchAttendancesByTeam,
  removeAttendance,
  updateAttendance,
} from '~/api/attendance';
import { AttendanceData } from '~/types/attendance';
import { QueryBaseOptions } from '~/types/query';

interface AttendanceQueryOptions<T> extends QueryBaseOptions<T> {
  teamId: string;
  dateStr: string;
}

export const useAttendanceQuery = ({
  teamId,
  dateStr,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, dateStr];

  const { data, isLoading, isError } = useQuery(
    queryKey,
    fetchAttendancesByTeam({ teamId: teamId, dateStr: dateStr }),
    { ...baseOptions },
  );

  const attendances = data ? data : [];
  const isEmpty = !attendances.length;
  return { attendances, isEmpty, isLoading, isError };
};

// 생성
export const useAttendanceCreate = ({
  teamId,
  dateStr,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, dateStr];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: createAttendanceMutate, isLoading: isCreateAttendanceLoading } = useMutation(
    queryKey,
    createAttendance,
    { onSettled, ...baseOptions },
  );

  return { createAttendanceMutate, isCreateAttendanceLoading };
};

// 업데이트
export const useAttendanceUpdate = ({
  teamId,
  dateStr,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, dateStr];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: updateAttendanceMutate, isLoading: isUpdateAttendanceLoading } = useMutation(
    queryKey,
    updateAttendance,
    { onSettled, ...baseOptions },
  );

  return { updateAttendanceMutate, isUpdateAttendanceLoading };
};

// 삭제
export const useAttendanceRemove = ({
  teamId,
  dateStr,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_ATTENDANCE_QUERY_KEY, teamId, dateStr];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: removeAttendanceMutate, isLoading: isRemoveAttendanceLoading } = useMutation(
    queryKey,
    removeAttendance,
    { onSettled, ...baseOptions },
  );

  return { removeAttendanceMutate, isRemoveAttendanceLoading };
};
