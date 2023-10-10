import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';

import { baseFetch, createRequest } from '~/api/base';
import { fetchEmployeeList } from '~/api/employee';
import { employeeMoveGroupRequest } from '~/api/group';
import { createWorkLog, removeWorkLog } from '~/api/worklog';
import { EmployeeCreateBody, EmployeeData, EmployeeUpdateBody } from '~/types/employee';

import { BaseQueryOptions, baseMutation } from './useBaseQuery';

export interface EmployeeQueryOptions extends BaseQueryOptions {
  page?: number;
  employeeId?: string;
}

export const employeeKeys = {
  all: ['employee'],
  byPage: (page: number) => [...employeeKeys.all, page],
};

export const useEmployeeQuery = ({ page = 1, onSuccess, onError }: EmployeeQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_EMPLOYEE_API_URL;

  const {
    data,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery(employeeKeys.byPage(page), fetchEmployeeList(endpoint, page), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const response = data?.result;
  const employees = data ? data.result.list : [];
  return { response, employees, isEmployeeLoading, isEmployeeError };
};

export const useEmployeeMutation = (queryKey: string[], options?: BaseQueryOptions) => {
  const queryClient = useQueryClient();

  const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_API_URL;
  const worklogEndpoint = import.meta.env.VITE_WORKLOG_API_URL;

  const handleSuccess = () => {
    const prevData = queryClient.getQueryData(queryKey);
  };

  // 근무로그
  const { mutate: createWorkLogMutate, isLoading: createWorkLogLoading } = useMutation(
    createWorkLog(employeeEndpoint, worklogEndpoint),
    {
      onSuccess: (data, variables) => {
        const oldData = queryClient.getQueryData<Array<EmployeeData>>(queryKey);
        // queryClient.setQueryData<Array<EmployeeData>>(queryKey, {
        //   ...oldData,
        // });
        console.log(oldData);
      },
    },
  );

  const { mutate: removeWorkLogMutate, isLoading: removeWorkLogLoading } = useMutation(
    removeWorkLog(worklogEndpoint),
  );

  const isLoading = createWorkLogLoading || removeWorkLogLoading;
  return {
    isLoading,

    createWorkLogMutate,
    removeWorkLogMutate,
  };
};
