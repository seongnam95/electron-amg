export interface BaseMultiDataParams {
  page?: number;
  limit?: number;
}

/** Create, Put, Remove Request Options */
export interface QueryDefaultOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (data: T) => void;
}

/** Fetch Request Options */
export interface BaseQueryOptions<R, T = BaseMultiDataParams> extends QueryDefaultOptions<R> {
  params?: T;
  enabled?: boolean;
}
