export interface GenericState<T> {
  value: T;
  status: 'IDLE' | 'LOADING' | 'FAILED';
  error?: string;
  param?: string;
}