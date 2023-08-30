export interface FetchResponse {
  success: boolean;
  msg: string;
  result: any;
}

export interface FetchListResponse<T> {
  success: boolean;
  msg: string;
  count: number;
  result: T[];
}

export interface BaseResponse {
  success: boolean;
  msg: string;
}
