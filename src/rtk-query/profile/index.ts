import { GET_METHOD, POST_METHOD, PUT_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  GET_USER_PROFILE_PATH,
  UPDATE_USER_PROFILE_PATH,
  UPDATE_USER_PROFILE_PHOTO,
} from '@/rtk-query/profile/api.constants';
import { ProfileResponse } from '@/rtk-query/profile/type';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: UPDATE_USER_PROFILE_PATH,
        method: PUT_METHOD,
        data,
      }),
    }),
    updateUserProfilePhoto: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: UPDATE_USER_PROFILE_PHOTO,
        method: POST_METHOD,
        data,
      }),
    }),
    getUserProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: GET_USER_PROFILE_PATH,
        method: GET_METHOD,
      }),
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useUpdateUserProfilePhotoMutation,
  useGetUserProfileQuery,
  endpoints,
} = AuthApi;
