import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { fetchEmployeeDetail, fetchEmployees, removeEmployees } from '~/api/employee';
import { BaseResponse } from '~/api/response';
import { EmployeeData, EmployeeDetailData } from '~/types/employee';
import { QueryBaseOptions } from '~/types/query';

interface EmployeeQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
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
interface EmployeeDetailQueryOptions extends QueryBaseOptions<EmployeeDetailData> {
  employeeId?: string;
}

export const useEmployeeDetailQuery = ({
  employeeId,
  ...baseOptions
}: EmployeeDetailQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, 'detail', employeeId];

  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery(queryKey, fetchEmployeeDetail(employeeId), {
    ...baseOptions,
  });

  return { employee, isLoading, isError };
};

export const useEmployeeRemoveMutation = ({
  teamId,
  onSuccess,
  onError,
}: EmployeeQueryOptions<unknown>) => {
  const queryKey: string[] = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, teamId];
  const queryClient = useQueryClient();

  const onSettled = () => queryClient.invalidateQueries(queryKey);

  // 삭제 Mutate 핸들러
  const handleRemoveMutate = async (employeeIds: string[]) => {
    const oldEmployeeData = queryClient.getQueryData<Array<EmployeeData>>(queryKey);

    if (oldEmployeeData) {
      // 쿼리 취소
      queryClient.cancelQueries(queryKey);

      // 대상 Employee를 제외한 리스트를 쿼리 데이터에 저장
      queryClient.setQueryData(queryKey, (employees: EmployeeData[] | undefined) => {
        return employees?.filter(employee => !employeeIds.includes(employee.id.toString())) ?? [];
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
