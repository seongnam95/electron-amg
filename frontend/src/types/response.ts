export interface BaseResponse {
  msg: string;
}

export interface FetchResponse<T> extends BaseResponse {
  result: T;
}

export interface ListResponseData<T> {
  total: number;
  offset: number;
  page: number;
  nextPage: number;
  hasMore: boolean;
  list: Array<T>;
}
export interface FetchListResponse<T> extends BaseResponse {
  result: ListResponseData<T>;
}
