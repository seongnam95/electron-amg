import { useMutation, useQuery } from 'react-query';

import { baseFetch } from '~/api/base';
import { employeeMoveGroupRequest } from '~/api/group';
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
  const endpoint = import.meta.env.VITE_EMPLOYEE_API_URL;

  const {
    initOptions,
    createMutate,
    updateMutate,
    removeMutate,
    isLoading: baseLoading,
  } = baseMutation<EmployeeCreateBody, EmployeeUpdateBody>(queryKey, endpoint, options);

  const isLoading = baseLoading;

  return {
    isLoading,
    createEmployeeMutate: createMutate,
    updateEmployeeMutate: updateMutate,
    removeEmployeeMutate: removeMutate,
  };
};
