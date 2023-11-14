import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchAttendances, updateAttendance } from '~/api/attendance';
import { AttendanceData, EmployeeAttendanceData } from '~/types/attendance';
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
}: AttendanceQueryOptions<EmployeeAttendanceData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId, date];

  const { data, isLoading, isError } = useQuery(
    queryKey,
    fetchAttendances({ id: teamId, date: date }),
    {
      ...baseOptions,
    },
  );

  const employees = data ? data.toReversed() : [];
  return { employees, isLoading, isError };
};

export const useAttendanceUpdateMutation = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<AttendanceData[]>) => {
  const queryKey: string[] = [import.meta.env.VITE_DRAFT_QUERY_KEY, teamId, date];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate: updateAttendanceMutate, isLoading: isUpdateAttendanceLoading } = useMutation(
    queryKey,
    updateAttendance,
    { onSettled, ...baseOptions },
  );

  return { updateAttendanceMutate, isUpdateAttendanceLoading };
};
