import { GET_METHOD, POST_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  CONFIRM_STRIPE_ONBOARDING_PATH,
  CREATE_ACCOUNT_SESSION_PATH,
  CREATE_CONNECTED_ACCOUNT_PATH,
} from '@/rtk-query/stripe-onboarding/api.constants';
import {
  CreateAccountSessionParams,
  CreateAccountSessionResponse,
  CreateConnectedAccountResponse,
} from '@/rtk-query/stripe-onboarding/types';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createConnectedAccount: build.mutation<
      CreateConnectedAccountResponse,
      void
    >({
      query: () => ({
        url: CREATE_CONNECTED_ACCOUNT_PATH,
        method: POST_METHOD,
      }),
    }),
    createAccountSession: build.mutation<
      CreateAccountSessionResponse,
      CreateAccountSessionParams
    >({
      query: (data) => ({
        url: CREATE_ACCOUNT_SESSION_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    confirmStripeOnboarding: build.query<unknown, void>({
      query: () => ({
        url: CONFIRM_STRIPE_ONBOARDING_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const {
  useCreateAccountSessionMutation,
  useCreateConnectedAccountMutation,
  useLazyConfirmStripeOnboardingQuery,
} = AuthApi;
