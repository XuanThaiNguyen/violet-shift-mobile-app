import { AxiosError } from 'axios';
import { ErrorMessages } from './errorMessages';

interface ApiErrorResponse {
  code?: number;
  message?: string;
  status?: string;
}

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const code = axiosError?.response?.data?.code;
  if (code && ErrorMessages[code]) {
    return ErrorMessages[code];
  }
  return axiosError?.response?.data?.message || 'Unexpected error occurred.';
};
