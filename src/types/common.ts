export interface FetchResponse {
  success: boolean;
  count: number;
  result: any;
}

export interface FetchListResponse {
  success: boolean;
  msg: string;
  count: number;
  result: any[];
}

export interface BaseResponse {
  success: boolean;
  msg: string;
}
