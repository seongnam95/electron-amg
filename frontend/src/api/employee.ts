import { EmployeeData, EmployeeDetailData } from '~/types/employee';

import axiosPrivate from './axios';
import { FetchListResponse, FetchResponse } from './response';

export const fetchEmployees =
  (teamId?: string) =>
  async <T extends FetchListResponse<EmployeeData>>(): Promise<T> => {
    const teamEndpoint = import.meta.env.VITE_TEAM_ENDPOINT;
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${teamEndpoint}/${teamId}/${endpoint}`);
    return data;
  };

export const fetchEmployeeDetail =
  (employeeId?: string) =>
  async <T extends FetchResponse<EmployeeDetailData>>(): Promise<T> => {
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;

    const { data } = await axiosPrivate.get<T>(`${endpoint}/${employeeId}`);
    return data;
  };
