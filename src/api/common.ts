import { BaseResponse, FetchListResponse } from '~/types/common';

import axiosPrivate from './axios';

export const fetchRequest =
  <T>(url: string) =>
  async (): Promise<FetchListResponse<T>> => {
    const { data } = await axiosPrivate.get<FetchListResponse<T>>(url);
    return data;
  };

export const fetchARequest =
  <T>(url: string, id: string) =>
  async (): Promise<FetchListResponse<T>> => {
    const { data } = await axiosPrivate.get<FetchListResponse<T>>(`${url}${id}`);
    return data;
  };

export const createRequest =
  <T>(url: string) =>
  async (body: T): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.post<BaseResponse>(url, body);
    return data;
  };

export const updateRequest =
  <T extends { id?: string }>(url: string) =>
  async (body: T): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.put<BaseResponse>(`${url}${body.id}`, body);
    return data;
  };

export const removeRequest =
  (url: string) =>
  async (id: string): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.delete<BaseResponse>(`${url}${id}`);
    return data;
  };
