import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import {
  fetchEmployeeDocument,
  fetchEmployees,
  removeEmployees,
  updateEmployee,
} from '~/api/employee';
import { BaseResponse, DataListResponse } from '~/api/response';
import { teamStore } from '~/stores/team';
import { EmployeeData, EmployeeDocument } from '~/types/employee';
import { QueryBaseOptions } from '~/types/query';

interface EmployeeQueryOptions<T> extends QueryBaseOptions<T> {
  employeeId?: string;
  teamId?: string;
  valid?: boolean;
}

export const useEmployee = ({
  teamId,
  valid,
  ...baseOptions
}: EmployeeQueryOptions<DataListResponse<EmployeeData>>) => {
  const setTeam = useSetRecoilState(teamStore);

  const queryKey: string[] = [
    import.meta.env.VITE_EMPLOYEE_QUERY_KEY,
    teamId,
    ...(valid !== undefined ? [valid ? 'valid' : 'invalid'] : []),
  ];

  const onSuccess = (data: DataListResponse<EmployeeData>) => {
    const employees = data.result.list;

    const teamLeader = employees.find(employee => employee.position.isLeader);
    if (teamLeader) setTeam(prev => ({ ...prev, leader: teamLeader }));

    baseOptions.onSuccess?.(data);
  };

  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    fetchEmployees({ teamId, valid }),
    { enabled: teamId !== '', ...baseOptions, onSuccess },
  );

  const total = data?.result.total;
  const employees = data ? data.result.list : [];

  const teamLeader = employees.find(employee => employee.position.isLeader);

  const sortedEmployees = employees.sort(
    (a, b) => a.position.sortingIndex - b.position.sortingIndex,
  );
  return { teamLeader, employees: sortedEmployees, total, isLoading, isError, refetch };
};

/**
 * Employee Detail
 */
interface EmployeeDetailQueryOptions extends QueryBaseOptions<EmployeeDocument> {
  employeeId?: string;
}

export const useEmployeeDocument = ({ employeeId, ...baseOptions }: EmployeeDetailQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, 'document', employeeId];

  const {
    data: employeeDocument,
    isLoading,
    isError,
  } = useQuery(queryKey, fetchEmployeeDocument(employeeId), {
    enabled: !!employeeId,
    ...baseOptions,
  });

  return { employeeDocument, isLoading, isError };
};

/**
 * Update Employee
 */
export const useEmployeeUpdate = ({
  employeeId,
  teamId,
  ...baseOptions
}: EmployeeQueryOptions<EmployeeData>) => {
  const queryKey: string[] = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const { mutate, isLoading } = useMutation(queryKey, updateEmployee(employeeId), {
    onSettled,
    ...baseOptions,
  });

  return { mutate, isLoading };
};

export const useEmployeeRemove = ({
  teamId,
  onError,
  onSuccess,
}: EmployeeQueryOptions<unknown>) => {
  const queryKey: string[] = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  // 삭제 Mutate 핸들러
  const handleRemoveMutate = async (employeeIds: string[]) => {
    const oldEmployeeData = queryClient.getQueryData<DataListResponse<EmployeeData>>(queryKey);

    if (oldEmployeeData) {
      queryClient.cancelQueries(queryKey);

      // 대상 Employee를 제외한 리스트를 쿼리 데이터에 저장
      queryClient.setQueryData(queryKey, () => {
        const newEmployees = oldEmployeeData.result.list.filter(
          employee => !employeeIds.includes(employee.id.toString()),
        );

        return {
          ...oldEmployeeData,
          result: {
            ...oldEmployeeData.result,
            list: newEmployees,
          },
        };
      });

      // 에러 시, 롤백 할 함수
      return () => queryClient.setQueryData(queryKey, oldEmployeeData);
    }
  };

  const { mutate: removeEmployeeMutate, isLoading: isRemoveEmployeeLoading } = useMutation(
    queryKey,
    removeEmployees,
    {
      onSettled,
      onSuccess,
      onMutate: handleRemoveMutate,
      onError: (err, _, rollback) => {
        const { response } = err as AxiosError<BaseResponse>;
        onError?.(response ? response.data.msg : '잠시후 다시 시도해주세요.');
        rollback?.();
      },
    },
  );

  return { removeEmployeeMutate, isRemoveEmployeeLoading };
};
