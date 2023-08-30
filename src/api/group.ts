import axios, { AxiosResponse } from 'axios';

import { BaseResponse, FetchListResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import axiosPrivate from './axios';

export interface GroupRequestBody {
  id?: string;
  name?: string;
  hexColor?: string;
  explanation?: string;
  userId?: string;
}

export const fetchGroups = async <T extends FetchListResponse<GroupData>>(): Promise<T> => {
  const { data } = await axiosPrivate.get<T>('/group/');
  return data;
};

export const createGroup = async (group: GroupRequestBody): Promise<BaseResponse> => {
  const { data } = await axiosPrivate.post<BaseResponse>(`/group/`, group);
  return data;
};

export const updateGroup = async (group: Partial<GroupRequestBody>): Promise<BaseResponse> => {
  const { data } = await axiosPrivate.put<BaseResponse>(`/group/${group.id}`, group);
  return data;
};

export const removeGroup = async (id: string): Promise<BaseResponse> => {
  const { data } = await axiosPrivate.delete<BaseResponse>(`/group/${id}`);
  return data;
};
