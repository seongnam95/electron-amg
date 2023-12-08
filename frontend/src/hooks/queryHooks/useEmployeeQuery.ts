import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { fetchEmployeeDocument, fetchEmployees, removeEmployees } from '~/api/employee';
import { BaseResponse, DataListResponse } from '~/api/response';
import { EmployeeData, EmployeeDocument } from '~/types/employee';
import { QueryBaseOptions } from '~/types/query';

interface EmployeeQueryOptions<T> extends QueryBaseOptions<T> {
  teamId?: string;
  valid?: boolean;
}

export const useEmployeeQuery = ({
  teamId,
  valid,
  ...baseOptions
}: EmployeeQueryOptions<DataListResponse<EmployeeData>>) => {
  const queryKey: string[] = [
    import.meta.env.VITE_EMPLOYEE_QUERY_KEY,
    teamId,
    ...(valid !== undefined ? [valid ? 'valid' : 'invalid'] : []),
  ];

  const { data, isLoading, isError, refetch } = useQuery(
    queryKey,
    fetchEmployees({ teamId, valid }),
    { ...baseOptions },
  );

  const dataList = data?.result.list;

  const total = data?.result.total;
  const teamLeader = dataList?.find(employees => employees.position.isLeader);
  const employees = dataList
    ? dataList.filter(employees => !employees.position.isLeader).toReversed()
    : [];
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

export const useEmployeeDocumentQuery = ({
  employeeId,
  ...baseOptions
}: EmployeeDetailQueryOptions) => {
  const queryKey: Array<string> = [import.meta.env.VITE_EMPLOYEE_QUERY_KEY, 'document', employeeId];

  const {
    data: employeeDocument,
    isLoading,
    isError,
  } = useQuery(queryKey, fetchEmployeeDocument(employeeId), {
    ...baseOptions,
  });

  return { employeeDocument, isLoading, isError };
};

export const useEmployeeRemoveMutation = ({
  teamId,
  onError,
  onSuccess,
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
