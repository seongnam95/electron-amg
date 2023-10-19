import { useQuery } from 'react-query';

import { EmployeeFetchParams, fetchEmployeeList } from '~/api/employee';

import { BaseQueryOptions } from './useBaseQuery';

export const useEmployeeQuery = ({
  params,
  onSuccess,
  onError,
}: BaseQueryOptions<EmployeeFetchParams> = {}) => {
  const queryKey: Array<string> = [
    import.meta.env.VITE_EMPLOYEE_QUERY_KEY,
    params ? params.valid : true,
  ];

  const { data, isLoading, isError } = useQuery(queryKey, fetchEmployeeList(params), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const response = data?.result;
  const employees = data ? data.result.list.toReversed() : [];

  return { response, employees, isLoading, isError };
};

export const useEmployeeCreate = () => {};
