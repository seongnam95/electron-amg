import { EmployeeMoveGroupBody } from '~/types/employee';
import { BaseResponse } from '~/types/response';

import axiosPrivate from './axios';

export const employeeMoveGroupRequest = async (
  body: EmployeeMoveGroupBody,
): Promise<BaseResponse> => {
  const url = `${import.meta.env.VITE_EMPLOYEE_API_URL}change/`;
  const { data } = await axiosPrivate.put<BaseResponse>(url, body);
  return data;
};
