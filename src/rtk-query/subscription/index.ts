import { GET_METHOD, PATCH_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  APPLY_COUPON_PATH,
  COMPLETE_PAYMENT,
  GET_ACTIVE_SUBSCRIPTION_PATH,
  GET_PAYMENT_HISTORY_PATH,
  GET_SUBSCRIPTION_PLANS,
  INITIALIZE_PAYMENT,
  INITIALIZE_SUBSCRIPTION,
  LIST_PAYMENT_METHODS_PATH,
} from '@/rtk-query/subscription/api.constants';
import {
  ActiveSubResponse,
  PaymentHistoryResponse,
} from '@/rtk-query/subscription/types';
import { PaymentMethodsType } from '@/slices/paymentMethods.slice';
import { SubscriptionType } from '@/slices/service-provider-subscription.slice';

type ClientSecret = { client_secret: string; stripe_public_key: string };

type CouponData = {
  discount: number;
  old_price: number;
  new_price: number;
};

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<SubscriptionType[], void>({
      query: () => ({
        url: GET_SUBSCRIPTION_PLANS,
        method: GET_METHOD,
      }),
    }),
    initializeSubscription: build.mutation({
      query: (data) => ({
        url: INITIALIZE_SUBSCRIPTION,
        method: PATCH_METHOD,
        data,
      }),
    }),
    initializePayment: build.query<ClientSecret, void>({
      query: () => ({
        url: INITIALIZE_PAYMENT,
        method: GET_METHOD,
      }),
    }),
    completePayment: build.query<unknown, void>({
      query: () => ({
        url: COMPLETE_PAYMENT,
        method: GET_METHOD,
      }),
    }),
    applyCoupon: build.mutation<CouponData, object>({
      query: (data) => ({
        url: APPLY_COUPON_PATH,
        method: PATCH_METHOD,
        data,
      }),
    }),
    listPaymentMethods: build.query<PaymentMethodsType[], void>({
      query: () => ({
        url: LIST_PAYMENT_METHODS_PATH,
        method: GET_METHOD,
      }),
    }),
    getPaymentHistory: build.query<PaymentHistoryResponse, { page: number }>({
      query: ({ page }) => ({
        url: GET_PAYMENT_HISTORY_PATH,
        method: GET_METHOD,
        params: { page },
      }),
    }),
    getActiveSubscription: build.query<ActiveSubResponse, void>({
      query: () => ({
        url: GET_ACTIVE_SUBSCRIPTION_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useInitializeSubscriptionMutation,
  useLazyCompletePaymentQuery,
  useInitializePaymentQuery,
  useApplyCouponMutation,
  useListPaymentMethodsQuery,
  useLazyListPaymentMethodsQuery,
  useGetPaymentHistoryQuery,
  useGetActiveSubscriptionQuery,
  endpoints,
} = AuthApi;
