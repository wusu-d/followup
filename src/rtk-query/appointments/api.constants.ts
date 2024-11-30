export const CREATE_APPOINTMENT_PATH = '/u/appointments' as const;

export const CONFIRM_APPOINTMENT_PATH = (appointmentId: number) => {
  return `/u/appointments/${appointmentId}/confirm`;
};

export const GET_APPOINTMENTS_PATH = (page = 1, type = 'pending') => {
  return `/u/appointments/${type}/${page}`;
};

export const GET_SINGLE_APPOINTMENTS_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}`;
};

export const CANCEL_APPOINTMENT_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}/cancel`;
};

export const ACCEPT_APPOINTMENT_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}/accept`;
};

export const UPLOAD_INVOICE_PATH = '/u/appointments/upload-invoice' as const;

export const MAKE_PAYMENT_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}/invoice/pay`;
};

export const JOIN_MEETING_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}/join-meeting`;
};

export const GET_MONTH_SCHEDULES_PATH =
  '/u/appointments/schedules/month' as const;

export const GET_APPOINTMENTS_SUMMARY_PATH = '/u/appointments/summary' as const;

export const DAY_SCHEDULES_PATH = '/u/appointments/schedules/day' as const;

export const CREATE_CHECKOUT_SESSION_PATH = (appointmentId: string) => {
  return `/u/appointments/${appointmentId}/create-checkout-session`;
};
