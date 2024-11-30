import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import {
  AXIOS_TIMEOUT_MSG,
  AXIOS_TIMEOUT_TIME,
  BASE_URL,
  UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
} from '@/rtk-query/api.constants';

axios.defaults.timeout = AXIOS_TIMEOUT_TIME;
axios.defaults.timeoutErrorMessage = AXIOS_TIMEOUT_MSG;
axios.defaults.maxContentLength = Infinity;
axios.defaults.maxBodyLength = Infinity;

const axiosBaseQuery =
  (
    { baseURL }: { baseURL: string } = { baseURL: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async (args) => {
    const { url, method, data, params } = args;

    try {
      // const session = await getSession()
      const result = await axios({
        url: url,
        method,
        data,
        params,
        baseURL,
        timeout: AXIOS_TIMEOUT_TIME,
        timeoutErrorMessage: AXIOS_TIMEOUT_MSG,
      });

      return { data: result?.data ? result.data : null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data || error.message,
          },
        };
      }

      return {
        error: {
          status: null,
          data: 'Something went wrong',
        },
      };
    }
  };

export const unauthenticatedGlobalApi = createApi({
  baseQuery: axiosBaseQuery({
    baseURL: BASE_URL || '',
  }),
  reducerPath: UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  endpoints: () => ({}),
  tagTypes: [],
});
