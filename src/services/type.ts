import { ApiStatus } from './ApiStatus';

export interface ApiResponse<T = undefined> {
  status: ApiStatus;
  message?: string;
  data?: T;
  metadata?: any;
}
