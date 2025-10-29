import { showSnack } from '@components/snackBar';
import { INITIAL_SNACKBAR } from '@components/snackBar/constant';
import { AUTH_ERROR_CODE } from '@services/ApiStatus';
import { ErrorMessages } from '@services/errorMessages';
import useAuthStore, { resetAuthStore } from '@zustand/authStore';
import axios, { AxiosError } from 'axios';
import qs from 'query-string';
import Config from 'react-native-config';

axios.defaults.baseURL = `${Config.API_BASE_URL}/api/v1`;

axios.interceptors.request.use(
  async config => {
    const token = useAuthStore.getState()?.token;
    config.headers.authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  error => handleError(error),
);

const handleError = async (error: AxiosError<{ code: number }>) => {
  if (error.response) {
    const unauthenticated =
      error?.response?.data?.code === AUTH_ERROR_CODE.UNAUTHENTICATED;
    if (unauthenticated) {
      showSnack({
        msg: ErrorMessages[error?.response?.data?.code],
        interval: INITIAL_SNACKBAR.DURATION_MEDIUM,
      });
      resetAuthStore();
    }
  }
  return Promise.reject(error);
};

const http = {
  get(url: any, config = {}) {
    return axios.get(url, config);
  },
  post(url: any, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url: any, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url: any, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url: any, config = {}) {
    return axios.delete(url, config);
  },
};

export function getQueryString(params: any) {
  const { filter, ...restParams } = params;

  if (filter) {
    const queryString = Object.keys(filter)
      .filter(
        key =>
          filter[key] !== undefined &&
          filter[key] !== null &&
          filter[key].length > 0,
      )
      .map(k => `"${k}":"${filter[k]}"`)
      .join(',');

    return Object.keys(restParams)
      .filter(
        key =>
          restParams[key] !== undefined &&
          restParams[key] !== null &&
          restParams[key].length > 0,
      )
      .map(k => `${k}=${restParams[k]}`)
      .join('&')
      .concat(`&filter={${queryString}}`);
  }

  return Object.keys(restParams)
    .filter(
      key =>
        restParams[key] !== undefined &&
        restParams[key] !== null &&
        restParams[key].length > 0,
    )
    .map(k => `${k}=${restParams[k]}`)
    .join('&');
}

export default http;

export function queryBuilder(preUrl: string, params: any = {}) {
  let queryString: any = {};

  const { orderBy, filter, ...rest } = params;

  if (orderBy) {
    queryString.orderBy = JSON.stringify(orderBy);
  }

  if (filter) {
    queryString.filter = JSON.stringify(filter);
  }

  return `${preUrl}?${qs.stringify({ ...queryString, ...rest })}`;
}
