import useAuthStore from '@zustand/authStore';
import axios from 'axios';
import qs from 'query-string';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_BASE_URL;

axios.interceptors.request.use(
  async config => {
    const token = useAuthStore.getState().currentUser?.token;
    config.headers.authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  (response: any) => {
    // if (
    //   response?.data?.status === ApiStatus.UNAUTHORIZED &&
    //   !isEmpty(store.getState().user.user)
    // ) {
    //   return alertBottomModal({
    //     title: 'Unauthorized',
    //     message: 'Please login again',
    //     dismissable: false,
    //     showCloseIcon: false,
    //     status: 'error',
    //     buttons: [
    //       {
    //         text: 'Login Again',
    //         preset: 'primary',
    //         onPress: () => {
    //           doLogout(Screen.Login);
    //         },
    //       },
    //       {
    //         text: 'Back to Home',
    //         preset: 'secondary',
    //         onPress: () => {
    //           doLogout(Screen.MainTab);
    //         },
    //       },
    //     ],
    //   });
    // }
    return response;
  },
  error => handleError(error),
);

const handleError = async (error: any) => {
  if (error.response) {
    const { message } = error?.response?.data?.error;
    if (message.includes('The credentials provided are incorrect')) {
      // refresh Token here;
    }
  }
  return Promise.reject(error.response || error.request || error.message);
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
