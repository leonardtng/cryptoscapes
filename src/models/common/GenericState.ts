export type Status = 'IDLE' | 'LOADING' | 'FAILED' | 'LOADING MORE';
// 'LOADING MORE' is only used when fetched data is appending to current data

export interface GenericState<T> {
  value: T;
  status: Status;
  error?: string;
  param?: string;
}