import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchEmployeeList } from '~/api/employee';

import { BaseQueryOptions } from './useBaseQuery';

export interface EmployeeQueryOptions extends BaseQueryOptions {
  employeeId?: string;
}

export const useEmployeeQuery = ({ onSuccess, onError }: EmployeeQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
  const queryKey = import.meta.env.VITE_EMPLOYEE_QUERY_KEY;

  const {
    data,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery(queryKey, fetchEmployeeList(endpoint), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const response = data?.result;
  const employees = data ? data.result.list.toReversed() : [];
  return { response, employees, isEmployeeLoading, isEmployeeError };
};
