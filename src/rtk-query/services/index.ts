import { GET_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import { AvailabilitySchedule } from '@/rtk-query/professional-profile/types';
import {
  GET_PROVIDER_AVAILABILITY_PATH,
  GET_PROVIDER_PORTFOLIO_PATH,
  GET_SERVICE_CHALLENGE_PATH,
  GET_SERVICE_PROVIDERS_PATH,
} from '@/rtk-query/services/api.constants';
import {
  ChallengesType,
  ProviderPortfolioType,
  ServiceProviderType,
} from '@/rtk-query/services/services.types';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getServicesChallenges: build.query<ChallengesType[], string | string[]>({
      query: (serviceId) => ({
        url: GET_SERVICE_CHALLENGE_PATH(serviceId),
        method: GET_METHOD,
      }),
    }),
    getServiceProviders: build.query<ServiceProviderType[], string>({
      query: (serviceId) => ({
        url: GET_SERVICE_PROVIDERS_PATH(serviceId),
        method: GET_METHOD,
      }),
    }),
    getProviderPortfolio: build.query<ProviderPortfolioType, string>({
      query: (userId) => ({
        url: GET_PROVIDER_PORTFOLIO_PATH(userId),
        method: GET_METHOD,
      }),
    }),
    getProviderAvailabilityClient: build.query<AvailabilitySchedule[], string>({
      query: (providerId) => ({
        url: GET_PROVIDER_AVAILABILITY_PATH(providerId),
        method: GET_METHOD,
      }),
    }),
  }),
});

export const {
  useGetServicesChallengesQuery,
  useGetServiceProvidersQuery,
  useGetProviderPortfolioQuery,
  useGetProviderAvailabilityClientQuery,
  endpoints,
} = AuthApi;
