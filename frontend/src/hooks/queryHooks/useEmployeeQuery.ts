import { useMutation, useQuery, useQueryClient } from 'react-query';

import { baseFetch } from '~/api/base';
import { employeeMoveGroupRequest } from '~/api/group';
import { EmployeeCreateBody, EmployeeData, EmployeeUpdateBody } from '~/types/employee';

import {
  BaseMultiDataParams,
  BaseQueryOptions,
  QueryDefaultOptions,
  baseMutation,
} from './useBaseQuery';

export interface EmployeeQueryParams extends BaseMultiDataParams {
  groupId?: string;
}

export interface EmployeeQueryOptions extends BaseQueryOptions {
  employeeId?: string;
  groupId?: string;
  params?: EmployeeQueryParams;
}

export const employeeKeys = {
  all: ['employee'],
  byId: (employeeId: string) => [...employeeKeys.all, employeeId],
  byGroup: (groupId: string) => [...employeeKeys.all, 'group', groupId],
};

export const useEmployeeQuery = ({
  employeeId,
  groupId,
  params,
  onSuccess,
  onError,
}: EmployeeQueryOptions = {}) => {
  const isUnaffiliated = groupId === 'etc';
  const baseEndpoint = import.meta.env.VITE_EMPLOYEE_API_URL;
  const endpoint = isUnaffiliated ? `${baseEndpoint}unaffiliated/` : baseEndpoint;

  const queryKey = employeeId
    ? employeeKeys.byId(employeeId)
    : groupId
    ? employeeKeys.byGroup(groupId)
    : employeeKeys.all;

  const newParams: EmployeeQueryParams = {
    ...params,
    groupId: !isUnaffiliated ? groupId : undefined,
  };

  const {
    data: response,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useQuery(
    queryKey,
    baseFetch<EmployeeData, EmployeeQueryParams>(endpoint, employeeId, newParams),
    {
      onSuccess: onSuccess,
      onError: onError,
    },
  );

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

  const { mutate: groupMoveMutate, isLoading: groupMoveLoading } = useMutation(
    employeeMoveGroupRequest,
    initOptions,
  );

  const isLoading = baseLoading || groupMoveLoading;

  return {
    isLoading,
    createEmployeeMutate: createMutate,
    updateEmployeeMutate: updateMutate,
    removeEmployeeMutate: removeMutate,
    groupMoveMutate,
  };
};
