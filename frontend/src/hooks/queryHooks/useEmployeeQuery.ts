import { useQuery } from 'react-query';

import { fetchEmployeeDetail, fetchEmployees } from '~/api/employee';
import { FetchListResponse, FetchResponse } from '~/api/response';
import { EmployeeData, EmployeeDetailData } from '~/types/employee';
import { BaseQueryOptions } from '~/types/query';

interface EmployeeQueryOptions<T> {
  teamId?: string;
  enabled?: boolean;
  onError?: (msg: string) => void;
  onSuccess?: (draft: T) => void;
}

/**
 * Employee List
 */
export const useEmployeeQuery = ({
  teamId,
  ...baseOptions
}: EmployeeQueryOptions<EmployeeData[]>) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployees(teamId), {
    ...baseOptions,
  });

  const employees = data ? data.toReversed() : [];
  return { employees, isLoading, isError };
};

/**
 * Employee Detail
 */
interface EmployeeDetailQueryOptions extends EmployeeQueryOptions {
  employeeId?: string;
}

export const useEmployeeDetailQuery = ({
  employeeId,
  ...baseOptions
}: EmployeeDetailQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, 'detail', employeeId];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployeeDetail(employeeId), {
    ...baseOptions,
  });
  const employee = data?.result;

  return { employee, isLoading, isError };
};
