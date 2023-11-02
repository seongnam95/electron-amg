export interface BaseMultiDataParams {
  page?: number;
  limit?: number;
}

/** Create, Put, Remove Request Options */
export interface QueryDefaultOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

/** Fetch Request Options */
export interface BaseQueryOptions<T = BaseMultiDataParams> extends QueryDefaultOptions {
  params?: T;
  enabled?: boolean;
}
