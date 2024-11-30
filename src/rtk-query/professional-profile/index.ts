import {
  DELETE_METHOD,
  GET_METHOD,
  PATCH_METHOD,
  POST_METHOD,
  PUT_METHOD,
} from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  COMPLETE_ONBOARDING_PATH,
  DELETE_SERVICE_PATH,
  FETCH_USER_sERVICES_PATH,
  GET_AVAILABILITY_PATH,
  GET_SERVICES_PATH,
  UPDATE_AVAILABILTY_PATH,
  UPDATE_BANK_EMAIL_PATH,
  UPDATE_SERVICE_PRICE_PATH,
  UPDATE_USER_SERVICES_PATH,
  UPDATE_WORK_PROFILE_PATH,
  UPLOAD_PROFILE_DOCUMENTS_PATH,
} from '@/rtk-query/professional-profile/api.constants';
import {
  AvailabilitySchedule,
  UserServicePriceParams,
  UserServices,
} from '@/rtk-query/professional-profile/types';
import { ServiceType } from '@/slices/professional-profile.slice';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    updateWorkProfile: build.mutation({
      query: (data) => ({
        url: UPDATE_WORK_PROFILE_PATH,
        method: PUT_METHOD,
        data,
      }),
    }),
    uploadDocuments: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: UPLOAD_PROFILE_DOCUMENTS_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    updateBankEmail: build.mutation({
      query: (data) => ({
        url: UPDATE_BANK_EMAIL_PATH,
        method: PUT_METHOD,
        data,
      }),
    }),
    updateAvailabilty: build.mutation({
      query: (data) => ({
        url: UPDATE_AVAILABILTY_PATH,
        method: PUT_METHOD,
        data,
      }),
    }),
    getServices: build.query<ServiceType[], void>({
      query: () => ({
        url: GET_SERVICES_PATH,
        method: GET_METHOD,
      }),
      keepUnusedDataFor: 300,
    }),
    updateUserServices: build.mutation({
      query: (data) => ({
        url: UPDATE_USER_SERVICES_PATH,
        method: PUT_METHOD,
        data,
      }),
    }),
    completeOnboarding: build.mutation<unknown, void>({
      query: () => ({
        url: COMPLETE_ONBOARDING_PATH,
        method: PATCH_METHOD,
      }),
    }),
    fetchUserServices: build.query<UserServices[], void>({
      query: () => ({
        url: FETCH_USER_sERVICES_PATH,
        method: GET_METHOD,
      }),
    }),
    getProviderAvailability: build.query<AvailabilitySchedule[], void>({
      query: () => ({
        url: GET_AVAILABILITY_PATH,
        method: GET_METHOD,
      }),
    }),
    deleteService: build.mutation<unknown, string>({
      query: (serviceId) => ({
        url: DELETE_SERVICE_PATH(serviceId),
        method: DELETE_METHOD,
      }),
    }),
    updateServicePrice: build.mutation<unknown, UserServicePriceParams>({
      query: ({ data, id }) => ({
        url: UPDATE_SERVICE_PRICE_PATH(id),
        method: PATCH_METHOD,
        data,
      }),
    }),
  }),
});

export const {
  useUpdateWorkProfileMutation,
  useUploadDocumentsMutation,
  useUpdateBankEmailMutation,
  useUpdateAvailabiltyMutation,
  useGetServicesQuery,
  useUpdateUserServicesMutation,
  useCompleteOnboardingMutation,
  useFetchUserServicesQuery,
  useGetProviderAvailabilityQuery,
  useDeleteServiceMutation,
  useUpdateServicePriceMutation,
  endpoints,
} = AuthApi;
