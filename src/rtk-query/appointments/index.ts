import {
  GET_METHOD,
  PATCH_METHOD,
  POST_METHOD,
} from '@/rtk-query/api.constants';
import {
  ACCEPT_APPOINTMENT_PATH,
  CANCEL_APPOINTMENT_PATH,
  CONFIRM_APPOINTMENT_PATH,
  CREATE_APPOINTMENT_PATH,
  CREATE_CHECKOUT_SESSION_PATH,
  DAY_SCHEDULES_PATH,
  GET_APPOINTMENTS_PATH,
  GET_APPOINTMENTS_SUMMARY_PATH,
  GET_MONTH_SCHEDULES_PATH,
  GET_SINGLE_APPOINTMENTS_PATH,
  JOIN_MEETING_PATH,
  MAKE_PAYMENT_PATH,
  UPLOAD_INVOICE_PATH,
} from '@/rtk-query/appointments/api.constants';
import {
  AppointmentDetails,
  AppointmentsSummary,
  cancelAppointmentParams,
  CheckoutSessionResponse,
  DayScheduleParams,
  DayScheduleResponse,
  GetAppointmentsResponse,
  MakePaymentParams,
  MonthlyScheduleParams,
  MonthlyScheduleResponse,
  ZoomMeetingConfig,
} from '@/rtk-query/appointments/types';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';

// Define the query parameters type
interface GetAppointmentsParams {
  page: number;
  type: string;
}

type ConfirmAppointmentParams = {
  data: { pay_later?: boolean; payment_method_id?: number };
  appointmentId: number;
};

const AuthApi = authenticatedGlobalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createAppointment: build.mutation({
      query: (data) => ({
        url: CREATE_APPOINTMENT_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    confirmAppointment: build.mutation<unknown, ConfirmAppointmentParams>({
      query: ({ appointmentId, data }) => ({
        url: CONFIRM_APPOINTMENT_PATH(appointmentId),
        method: PATCH_METHOD,
        data,
      }),
    }),
    getAppointments: build.query<
      GetAppointmentsResponse,
      GetAppointmentsParams
    >({
      query: ({ page, type }) => ({
        url: GET_APPOINTMENTS_PATH(page, type),
        method: GET_METHOD,
      }),
    }),
    getSingleAppointment: build.query<AppointmentDetails, string>({
      query: (appointmentId) => ({
        url: GET_SINGLE_APPOINTMENTS_PATH(appointmentId),
        method: GET_METHOD,
      }),
    }),
    cancelAppointment: build.mutation<unknown, cancelAppointmentParams>({
      query: ({ data, appointmentId }) => ({
        url: CANCEL_APPOINTMENT_PATH(appointmentId),
        method: PATCH_METHOD,
        data,
      }),
    }),
    acceptAppointment: build.mutation<unknown, string>({
      query: (appointmentId) => ({
        url: ACCEPT_APPOINTMENT_PATH(appointmentId),
        method: PATCH_METHOD,
      }),
    }),
    uploadInvoice: build.mutation<unknown, FormData>({
      query: (data) => ({
        url: UPLOAD_INVOICE_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    makePaymentAppointment: build.mutation<unknown, MakePaymentParams>({
      query: ({ data, appointmentId }) => ({
        url: MAKE_PAYMENT_PATH(appointmentId),
        method: PATCH_METHOD,
        data,
      }),
    }),
    joinMeeting: build.query<ZoomMeetingConfig, string>({
      query: (appointmentId) => ({
        url: JOIN_MEETING_PATH(appointmentId),
        method: GET_METHOD,
      }),
    }),
    getMonthSchedules: build.mutation<
      MonthlyScheduleResponse,
      MonthlyScheduleParams
    >({
      query: (data) => ({
        url: GET_MONTH_SCHEDULES_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    getAppointmentsSummary: build.query<AppointmentsSummary, void>({
      query: () => ({
        url: GET_APPOINTMENTS_SUMMARY_PATH,
        method: GET_METHOD,
      }),
    }),
    daySchedules: build.mutation<DayScheduleResponse, DayScheduleParams>({
      query: (data) => ({
        url: DAY_SCHEDULES_PATH,
        method: POST_METHOD,
        data,
      }),
    }),
    createCheckoutSession: build.mutation<CheckoutSessionResponse, string>({
      query: (appointmentId) => ({
        url: CREATE_CHECKOUT_SESSION_PATH(appointmentId),
        method: PATCH_METHOD,
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useConfirmAppointmentMutation,
  useGetAppointmentsQuery,
  useGetSingleAppointmentQuery,
  useCancelAppointmentMutation,
  useAcceptAppointmentMutation,
  useUploadInvoiceMutation,
  useMakePaymentAppointmentMutation,
  useJoinMeetingQuery,
  useGetMonthSchedulesMutation,
  useGetAppointmentsSummaryQuery,
  useDaySchedulesMutation,
  useCreateCheckoutSessionMutation,
  endpoints,
} = AuthApi;
