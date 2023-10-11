import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchEmployeeList } from '~/api/employee';

import { BaseQueryOptions } from './useBaseQuery';

export interface EmployeeQueryOptions extends BaseQueryOptions {
  page?: number;
  employeeId?: string;
}

export const useEmployeeQuery = ({ page = 1, onSuccess, onError }: EmployeeQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
  const queryKey = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, page.toString()];

  const {
    data,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery(queryKey, fetchEmployeeList(endpoint, page), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const response = data?.result;
  const employees = data ? data.result.list : [];
  return { response, employees, isEmployeeLoading, isEmployeeError };
};
