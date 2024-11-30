import { GET_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import { PROVIDER_DASHBOARD_PATH } from '@/rtk-query/dashboard/api.constants';
import { ProviderDashboardResponse } from '@/rtk-query/dashboard/type';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProviderDashboard: build.query<ProviderDashboardResponse, void>({
      query: () => ({
        url: PROVIDER_DASHBOARD_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const { useGetProviderDashboardQuery } = AuthApi;
