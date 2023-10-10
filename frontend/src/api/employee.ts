import { EmployeeData } from '~/types/employee';
import { FetchListResponse } from '~/types/response';

import axiosPrivate from './axios';

export const fetchEmployeeList =
  (url: string, page: number) =>
  async <T extends FetchListResponse<EmployeeData>>(): Promise<T> => {
    const { data } = await axiosPrivate.get<T>(`${url}`, {
      params: {
        page: page,
      },
    });
    return data;
  };
