import { AxiosError, AxiosResponse } from 'axios';

import { EmployeeData, EmployeeDocument } from '~/types/employee';

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

export const fetchEmployeeDocument =
  (employeeId?: string) => async (): Promise<EmployeeDocument> => {
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchResponse<EmployeeDocument>>(
      `${endpoint}/${employeeId}/document`,
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
