export interface BaseResponse {
  success: boolean;
  msg: string;
}

export interface FetchResponse<T> extends BaseResponse {
  result: T;
}

export interface FetchListResponse<T> extends BaseResponse {
  count: number;
  result: T[];
}
