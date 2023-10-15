import { EmployeeData } from '~/types/employee';
import { FetchListResponse } from '~/types/response';

import axiosPrivate from './axios';

export const fetchEmployeeList =
  (url: string) =>
  async <T extends FetchListResponse<EmployeeData>>(): Promise<T> => {
    const { data } = await axiosPrivate.get<T>(`${url}`);
    return data;
  };
