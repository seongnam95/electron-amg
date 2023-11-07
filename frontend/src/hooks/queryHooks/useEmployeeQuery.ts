import { useQuery } from 'react-query';

import { fetchEmployeeDetail, fetchEmployees } from '~/api/employee';
import { FetchListResponse } from '~/api/response';
import { EmployeeData, EmployeeDetailData } from '~/types/employee';
import { BaseQueryOptions } from '~/types/query';

interface EmployeeQueryOptions extends BaseQueryOptions<FetchListResponse<EmployeeData>> {
  teamId?: string;
}

export const useEmployeeQuery = ({ teamId, ...baseOptions }: EmployeeQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployees(teamId), {
    ...baseOptions,
  });

  const employees = data ? data.result.list.toReversed() : [];
  return { employees, isLoading, isError };
};

interface EmployeeDetailQueryOptions
  extends BaseQueryOptions<FetchListResponse<EmployeeDetailData>> {
  employeeId: string;
}

export const useEmployeeDetailQuery = ({
  employeeId,
  onSuccess,
  onError,
}: EmployeeDetailQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, 'detail', employeeId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployeeDetail(employeeId), {
    onSuccess: onSuccess,
    onError: onError,
  });
  const employee = data?.result;

  return { employee, isLoading, isError };
};
