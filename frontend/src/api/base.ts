import { BaseMultiDataParams } from '~/hooks/queryHooks/useBaseQuery';
import { BaseResponse, FetchResponse, FetchListResponse } from '~/types/response';

import axiosPrivate from './axios';

export type Params = { [key: string]: string | number };

/**
 * [ API ] 모든 데이터 가져오기
 * @param url 요청 URL
 * @returns
 */
export const fetchAllRequest =
  <T>(url: string) =>
  async (): Promise<FetchListResponse<T>> => {
    const { data } = await axiosPrivate.get<FetchListResponse<T>>(url);
    return data;
  };

/**
 * [ API ] 데이터 가져오기 (ID가 없다면 전체 데이터 호출)
 * @param url 요청 URL
 * @param id 가져올 데이터의 ID
 */
export const baseFetch =
  <TData, TParams = BaseMultiDataParams, R = FetchListResponse<TData>>(
    url: string,
    id?: string,
    params?: TParams,
  ) =>
  async (): Promise<R> => {
    const endpoint = id ? `${url}${id}` : url;
    const { data } = await axiosPrivate.get<R>(endpoint, { params });

    return data;
  };

/**
 * [ API ] 데이터 생성
 * @param url 요청 URL
 * @param body T
 */
export const createRequest =
  <T>(url: string) =>
  async (body: T): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.post<BaseResponse>(url, body);
    return data;
  };

/**
 * [ API ] 데이터 업데이트
 * @param url 요청 URL
 * @param id 타겟 ID
 * @param body 변경할 데이터
 */
export const updateRequest =
  <T>(url: string) =>
  async ({ id, body }: { id: string; body: T }): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.put<BaseResponse>(`${url}${id}`, body);
    return data;
  };

/**
 * [ API ] 데이터 삭제
 * @param url 요청 URL
 * @returns
 */
export const removeRequest =
  (url: string) =>
  async (id: string): Promise<BaseResponse> => {
    const { data } = await axiosPrivate.delete<BaseResponse>(`${url}${id}`);
    return data;
  };
