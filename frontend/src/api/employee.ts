import { AxiosResponse } from 'axios';

import {
  EmployeeCreateBody,
  EmployeeData,
  EmployeeDocument,
  EmployeeUpdateBody,
} from '~/types/employee';

import axiosPrivate from './axios';
import { BaseResponse, DataListResponse, DataResponse } from './response';

export type FetchEmployeeFilter = 'all' | 'valid' | 'invalid';

interface FetchEmployeesParams {
  teamId?: string;
  valid?: boolean;
}

export const fetchEmployees =
  ({ teamId, ...params }: FetchEmployeesParams) =>
  async (): Promise<DataListResponse<EmployeeData>> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<DataListResponse<EmployeeData>>(
      `${teamEndpoint}/${teamId}/${endpoint}`,
      { params },
    );

    return data;
  };

export const fetchEmployeeDocument =
  (employeeId?: string) => async (): Promise<EmployeeDocument> => {
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<DataResponse<EmployeeDocument>>(
      `${endpoint}/${employeeId}/document`,
    );

    return data.result;
  };

export const createEmployee =
  (teamId?: string) =>
  async (body: EmployeeCreateBody): Promise<EmployeeData> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.post<DataResponse<EmployeeData>>(
      `${teamEndpoint}/${teamId}/${employeeEndpoint}`,
      body,
    );

    return data.result;
  };

/**
 * Employee 업데이트 API
 * @param EmployeeAxiosProps
 * @returns Promise<EmployeeData[]>
 */
export const updateEmployee =
  (employeeId?: string) =>
  async (body: EmployeeUpdateBody): Promise<EmployeeData> => {
    const employeeEndpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
    const { data } = await axiosPrivate.put<DataResponse<EmployeeData>>(
      `${employeeEndpoint}/${employeeId}`,
      body,
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
