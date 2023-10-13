import { useMutation, useQueryClient } from 'react-query';

import { createAttendanceRequest, removeAttendanceRequest } from '~/api/attendance';

import { BaseQueryOptions } from './useBaseQuery';

export const useAttendanceMutation = (queryKey?: string[], options?: BaseQueryOptions) => {
  const queryClient = useQueryClient();
  const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
  const attendanceEndpoint = import.meta.env.VITE_ATTENDANCE_ENDPOINT;
  const employeeQueryKey = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, ...(queryKey || [])];

  const onSettled = () => queryClient.invalidateQueries(employeeQueryKey);

  const { mutate: createAttendance, isLoading: createAttendanceLoading } = useMutation(
    createAttendanceRequest(employeeEndpoint, attendanceEndpoint),
    { ...options, onSettled },
  );

  const { mutate: removeAttendance, isLoading: removeAttendanceLoading } = useMutation(
    removeAttendanceRequest(attendanceEndpoint),
    { ...options, onSettled },
  );

  const isLoading = createAttendanceLoading || removeAttendanceLoading;
  return { createAttendance, removeAttendance, isLoading };
};
