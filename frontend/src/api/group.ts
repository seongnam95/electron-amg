import { BaseResponse } from '~/types/response';
import { WorkerMoveGroupBody } from '~/types/worker';

import axiosPrivate from './axios';

export const workerMoveGroupRequest = async (body: WorkerMoveGroupBody): Promise<BaseResponse> => {
  const url = `${import.meta.env.VITE_WORKER_API_URL}change/`;
  const { data } = await axiosPrivate.put<BaseResponse>(url, body);
  return data;
};
