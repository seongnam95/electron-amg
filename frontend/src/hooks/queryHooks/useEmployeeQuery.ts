import { useMutation, useQuery } from 'react-query';

import { baseFetch, createRequest } from '~/api/base';
import { employeeMoveGroupRequest } from '~/api/group';
import { createWorkLog } from '~/api/worklog';
import { EmployeeCreateBody, EmployeeData, EmployeeUpdateBody } from '~/types/employee';

import { BaseQueryOptions, baseMutation } from './useBaseQuery';

export interface EmployeeQueryOptions extends BaseQueryOptions {
  employeeId?: string;
}

export const employeeKeys = {
  all: ['employee'],
  byId: (employeeId: string) => [...employeeKeys.all, employeeId],
};

export const useEmployeeQuery = ({ employeeId, onSuccess, onError }: EmployeeQueryOptions = {}) => {
  const endpoint = import.meta.env.VITE_EMPLOYEE_API_URL;
  const queryKey = employeeId ? employeeKeys.byId(employeeId) : employeeKeys.all;

  const {
    data: response,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery(queryKey, baseFetch<EmployeeData>(endpoint, employeeId), {
    onSuccess: onSuccess,
    onError: onError,
  });

  const employees = response ? response.result : [];
  return { response, employees, isEmployeeLoading, isEmployeeError };
};

export const useEmployeeMutation = (queryKey: string[], options?: BaseQueryOptions) => {
  const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_API_URL;
  const worklogEndpoint = import.meta.env.VITE_WORKLOG_API_URL;

  // BASE CRU
  const {
    createMutate,
    removeMutate,
    updateMutate,
    isLoading: baseLoading,
    initOptions,
  } = baseMutation<EmployeeCreateBody, EmployeeUpdateBody>(queryKey, employeeEndpoint, options);

  // 근무로그
  const { mutate: createWorkLogMutate, isLoading: createWorkLogLoading } = useMutation(
    createWorkLog(employeeEndpoint, worklogEndpoint),
    initOptions,
  );

  const { mutate: removeWorkLogMutate, isLoading: removeWorkLogLoading } = useMutation(
    createWorkLog(employeeEndpoint, worklogEndpoint),
    initOptions,
  );

  const isLoading = baseLoading || createWorkLogLoading;
  return {
    isLoading,
    createEmployeeMutate: createMutate,
    updateEmployeeMutate: updateMutate,
    removeEmployeeMutate: removeMutate,
    createWorkLogMutate,
  };
};
