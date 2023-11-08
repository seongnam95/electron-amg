
/** Create, Put, Remove Request Options */
export interface QueryBaseOptions<T> {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (data: T) => void;
}
