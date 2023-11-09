import { AxiosError, AxiosResponse } from 'axios';

import { EmployeeData, EmployeeDetailData } from '~/types/employee';

import axiosPrivate from './axios';
import { BaseResponse, FetchListResponse, FetchResponse } from './response';

export const fetchEmployees = (teamId?: string) => async (): Promise<EmployeeData[]> => {
  const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
  const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

  const { data } = await axiosPrivate.get<FetchListResponse<EmployeeData>>(
    `${teamEndpoint}/${teamId}/${endpoint}`,
  );

  return data.result.list;
};

export const fetchEmployeeDetail =
  (employeeId?: string) => async (): Promise<EmployeeDetailData> => {
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchResponse<EmployeeDetailData>>(
      `${endpoint}/${employeeId}`,
    );

    return data.result;
  };

export const removeEmployees = async (employeeIds: string[]): Promise<void> => {
  const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

  const deletePromises = employeeIds.map(id =>
    axiosPrivate.delete<BaseResponse, AxiosResponse<BaseResponse>>(`${endpoint}/${id}`),
  );

  await Promise.all(deletePromises);
};
