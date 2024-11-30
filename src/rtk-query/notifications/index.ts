import { GET_METHOD, PATCH_METHOD } from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import {
  GET_NOTIFICATIONS_PATH,
  MARK_AS_SEEN_PATH,
} from '@/rtk-query/notifications/api.constants';
import {
  MarkAsSeenParam,
  NotificationsResponse,
} from '@/rtk-query/notifications/types';

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNotifications: build.query<NotificationsResponse, { page: number }>({
      query: ({ page }) => ({
        url: GET_NOTIFICATIONS_PATH,
        method: GET_METHOD,
        params: { page },
      }),
    }),
    markAsSeen: build.mutation<void, MarkAsSeenParam>({
      query: (data) => ({
        url: MARK_AS_SEEN_PATH,
        method: PATCH_METHOD,
        data,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkAsSeenMutation } = AuthApi;
