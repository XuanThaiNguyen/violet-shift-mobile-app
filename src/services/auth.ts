import http from '@utils/http';
import ApiKeys from './api';

export const login = async (loginInfo: { email: string; password: string }) => {
  const response = await http.post(ApiKeys.LOGIN, loginInfo);
  return response.data;
};

export const logout = async () => {
  const response = await http.post(ApiKeys.LOGOUT);
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await http.post(ApiKeys.RESET_PASSWORD, { email });
  return response.data;
};

export const authService = {
  login,
  logout,
  resetPassword,
};
