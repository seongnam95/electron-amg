import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Dayjs } from 'dayjs';

import {
  createAttendance,
  fetchAttendancesByTeam,
  removeAttendance,
  updateAttendance,
} from '~/api/attendance';
import { AttendanceData } from '~/types/attendance';
import { QueryBaseOptions } from '~/types/query';

type DateType = 'month' | 'day';

const createQueryKey = (teamId: string, date: Dayjs, dateType: DateType): string[] => {
  const attendanceQueryKey = import.meta.env.VITE_ATTENDANCE_QUERY_KEY;
  const dateStr = date.format(dateType === 'month' ? 'YY-MM' : 'YY-MM-DD');
  return [attendanceQueryKey, teamId, ...dateStr.split('-')];
};

export interface AttendanceQueryOptions extends QueryBaseOptions<AttendanceData[]> {
  teamId: string;
  dateType: 'day' | 'month';
  date: Dayjs;
}

/**
 * Attendance 쿼리
 */
export const useAttendanceQuery = ({
  teamId,
  dateType,
  date,
  ...baseOptions
}: AttendanceQueryOptions) => {
  const queryKey: Array<string> = createQueryKey(teamId, date, dateType);

  const dateStr = date.format(dateType === 'month' ? 'YY-MM' : 'YY-MM-DD');
  const { data, isLoading, isError } = useQuery(
    queryKey,
    fetchAttendancesByTeam({ teamId: teamId, dateStr: dateStr }),
    { ...baseOptions },
  );

  const attendances = data ? data : [];
  const isEmpty = !attendances.length;
  return { attendances, isEmpty, isLoading, isError };
};

/**
 * Attendance 생성 Mutate
 */
export const useAttendanceCreate = ({
  teamId,
  dateType,
  date,
  ...baseOptions
}: AttendanceQueryOptions) => {
  const queryClient = useQueryClient();
  const queryKey: Array<string> = createQueryKey(teamId, date, dateType);

  const onSettled = () => {
    const monthQueryKey = createQueryKey(teamId, date, 'month');
    queryClient.invalidateQueries(monthQueryKey);
  };

  const { mutate: createAttendanceMutate, isLoading: isCreateAttendanceLoading } = useMutation(
    queryKey,
    createAttendance,
    { onSettled, ...baseOptions },
  );

  return { createAttendanceMutate, isCreateAttendanceLoading };
};

/**
 * Attendance 업데이트 Mutate
 */
export const useAttendanceUpdate = ({
  teamId,
  dateType,
  date,
  ...baseOptions
}: AttendanceQueryOptions) => {
  const queryClient = useQueryClient();
  const queryKey: Array<string> = createQueryKey(teamId, date, dateType);

  const onSettled = () => {
    const monthQueryKey = createQueryKey(teamId, date, 'month');
    queryClient.invalidateQueries(monthQueryKey);
  };

  const { mutate: updateAttendanceMutate, isLoading: isUpdateAttendanceLoading } = useMutation(
    queryKey,
    updateAttendance,
    { onSettled, ...baseOptions },
  );

  return { updateAttendanceMutate, isUpdateAttendanceLoading };
};

/**
 * Attendance 삭제 Mutate
 */
export const useAttendanceRemove = ({
  teamId,
  dateType,
  date,
  ...baseOptions
}: AttendanceQueryOptions) => {
  const queryClient = useQueryClient();
  const queryKey: Array<string> = createQueryKey(teamId, date, dateType);

  const onSettled = () => {
    const monthQueryKey = createQueryKey(teamId, date, 'month');
    queryClient.invalidateQueries(monthQueryKey);
  };

  const { mutate: removeAttendanceMutate, isLoading: isRemoveAttendanceLoading } = useMutation(
    queryKey,
    removeAttendance,
    { onSettled, ...baseOptions },
  );

  return { removeAttendanceMutate, isRemoveAttendanceLoading };
};
