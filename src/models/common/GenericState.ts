export type Status = 'IDLE' | 'LOADING' | 'FAILED';

export interface GenericState<T> {
  value: T;
  status: Status;
  error?: string;
  param?: string;
}