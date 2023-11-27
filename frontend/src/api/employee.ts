import { AxiosResponse } from 'axios';

import { EmployeeData, EmployeeDocument } from '~/types/employee';

import axiosPrivate from './axios';
import { BaseResponse, FetchListResponse, FetchResponse } from './response';

export type FetchEmployeeFilter = 'all' | 'valid' | 'invalid';

interface FetchEmployeesParams {
  teamId?: string;
  valid?: boolean;
}

export const fetchEmployees =
  ({ teamId, ...params }: FetchEmployeesParams) =>
  async (): Promise<FetchListResponse<EmployeeData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<FetchListResponse<EmployeeData>>(
      `${teamEndpoint}/${teamId}/${endpoint}`,
      { params },
    );

    return data;
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
