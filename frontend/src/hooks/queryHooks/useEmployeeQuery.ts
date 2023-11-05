import { useQuery } from 'react-query';

import { fetchEmployeeDetail, fetchEmployees } from '~/api/employee';
import { BaseQueryOptions } from '~/types/query';

interface EmployeeQueryOptions extends BaseQueryOptions {
  teamId: string;
}

export const useEmployeeQuery = ({ teamId, onSuccess, onError }: EmployeeQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployees(teamId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const employees = data ? data.result.list.toReversed() : [];

  return { employees, isLoading, isError };
};

interface EmployeeDetailQueryOptions extends BaseQueryOptions {
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
