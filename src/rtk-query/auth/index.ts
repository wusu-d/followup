import { PATCH_METHOD, POST_METHOD } from '@/rtk-query/api.constants';
import {
  REGISTER_USER_PATH,
  RESEND_VERIFICATION_PATH,
  UPDATE_PASSWORD_PATH,
} from '@/rtk-query/auth/auth.api.constants';
import { UpdatePasswordParams } from '@/rtk-query/auth/types';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import { unauthenticatedGlobalApi } from '@/rtk-query/unauthenticatedGlobalApi';

const AuthApi = unauthenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    registerUser: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: REGISTER_USER_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    resendVerification: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: RESEND_VERIFICATION_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
  }),
});

const AuthApi2 = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    updatePassword: build.mutation<unknown, UpdatePasswordParams>({
      query: (data) => ({
        url: UPDATE_PASSWORD_PATH,
        method: PATCH_METHOD,
        data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useResendVerificationMutation } =
  AuthApi;

export const { useUpdatePasswordMutation } = AuthApi2;
