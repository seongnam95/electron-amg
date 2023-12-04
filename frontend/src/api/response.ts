export interface BaseResponse {
  msg: string;
}

export interface DataResponse<T> extends BaseResponse {
  result: T;
}

export interface ListResponseResult<T> {
  total: number;
  offset: number;
  page: number;
  nextPage: number;
  hasMore: boolean;
  list: Array<T>;
}

export interface DataListResponse<T> extends BaseResponse {
  result: ListResponseResult<T>;
}

export interface DataListParams {
  page?: number;
  limit?: number;
}
