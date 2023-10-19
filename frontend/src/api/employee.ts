import { EmployeeData } from '~/types/employee';
import { FetchListResponse } from '~/types/response';

import axiosPrivate from './axios';

export interface EmployeeFetchParams {
  valid?: boolean;
  skip?: number;
  limit?: number;
}

export const fetchEmployeeList =
  (params?: EmployeeFetchParams) =>
  async <T extends FetchListResponse<EmployeeData>>(): Promise<T> => {
    const endpoint = import.meta.env.VITE_EMPLOYEE_ENDPOINT;
    const { data } = await axiosPrivate.get<T>(endpoint, { params });
    return data;
  };
