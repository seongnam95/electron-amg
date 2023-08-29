import { AxiosResponse } from 'axios';

import { BaseResponse, FetchListResponse } from '~/types/common';
import { GroupData } from '~/types/group';

import axiosPrivate from './axios';

interface GroupRequestBody {
  id: string;
  name: string;
  hexColor: string;
  explanation?: string;
  userId?: string;
}

const apiCall = async <T>(method: 'get' | 'post' | 'put' | 'delete', url: string, body?: any) => {
  const response = await axiosPrivate.get('/group/');
  return response.data;
};

export const fetchGroups = async (): Promise<GroupData[]> => {
  const response = await axiosPrivate.get('/group/');
  console.log(response.data.result);
  return response.data.result;
};

export const createGroup = async (group: GroupRequestBody): Promise<BaseResponse> => {
  const response = await axiosPrivate.post(`/group/`, group);
  return response.data;
};

export const updateGroup = async (group: Partial<GroupRequestBody>): Promise<BaseResponse> => {
  const response = await axiosPrivate.put(`/group/${group.id}`, group);
  return response.data;
};

export const removeGroup = async (id: string): Promise<BaseResponse> => {
  const response = await axiosPrivate.delete(`/group/${id}`);
  return response.data;
};
