import { ApiStatus } from './ApiStatus';

export interface QueryObjectResponse<T = undefined> {
  data?: T;
  code: number;
  message?: string;
  status: ApiStatus;
}

export type QueryArrayResponse<T> = {
  data: T[];
  code: number;
  message?: string;
  status: ApiStatus;
};
