import { useQuery } from 'react-query';

import { fetchAttendances } from '~/api/attendance';
import { EmployeeAttendanceData } from '~/types/attendance';
import { QueryBaseOptions } from '~/types/query';

interface AttendanceQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
  date?: string;
}

export const useAttendanceQuery = ({
  teamId,
  date,
  ...baseOptions
}: AttendanceQueryOptions<EmployeeAttendanceData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId, date];

  const { data, isLoading, isError } = useQuery(
    queryKey,
    fetchAttendances({ teamId: teamId, date: date }),
    {
      ...baseOptions,
    },
  );

  const attendances = data ? data.toReversed() : [];
  return { attendances, isLoading, isError };
};
