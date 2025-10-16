import http from '@utils/http';
import ApiKeys from './api';

export const login = async (loginInfo: { email: string; password: string }) => {
  const response = await http.post(ApiKeys.LOGIN, loginInfo);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await http.post(ApiKeys.FORGOT_PASSWORD, { email });
  return response.data;
};

export const authService = {
  login,
  forgotPassword,
};
