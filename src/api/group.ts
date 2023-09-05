import { BaseResponse } from '~/types/common';

import axiosPrivate from './axios';

export interface ChangeGroupBody {
  groupId: string;
  worker_list: string[];
}

export const changeGroupRequest = async (body: ChangeGroupBody): Promise<BaseResponse> => {
  const url = `${import.meta.env.VITE_GROUP_API_URL}change/`;
  const { data } = await axiosPrivate.put<BaseResponse>(url, body);
  return data;
};
