export type AppointmentDetails = {
  id: number;
  appointment_no: string;
  service_id: number;
  challenge_id: number;
  provider_id: number;
  client_id: number;
  appointment_time: string; // Can be a Date if converted later
  appointment_type: string;
  service_type: string;
  goal: string;
  note: string | null;
  convenience_charge: number;
  consultation_charge: number;
  service_charge: number;
  total_charge: number;
  invoice: string | null;
  payment_id: string | null;
  coupon_id: string | null;
  payment_status: string;
  payment_mode: string | null;
  meeting_link: string;
  status: string;
  created_at: number; // Unix timestamp
  updated_at: number; // Unix timestamp
  deleted_at: number | null;
  cancellation_reason: string | null;
  cancelled_by: string | null;
  client_name: string;
  provider_name: string;
  provider_address: string;
  service_category: string;
  challenge: string;
  client_image: string;
  provider_image: string;
  provider: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_image: string;
    profession: string;
  };
};

export type AppointmentType = {
  id: number;
  appointment_no: string;
  service_id: number;
  challenge_id: number;
  status: string;
  appointment_time: string; // Consider using Date if it's parsed to a Date object
  appointment_type: string;
  service_type: string;
  client_name: string;
  client_image: string;
  provider_name: string;
  provider_address: string;
  provider_image: string;
  challenge: string;
};

export type GetAppointmentsResponse = {
  type: string;
  current_page: number;
  page_count: number;
  total_records: number;
  data: AppointmentType[];
};

export type cancelAppointmentParams = {
  data: { cancellation_reason: string };
  appointmentId: string;
};

export type MakePaymentParams = {
  data: { payment_method_id: number };
  appointmentId: string;
};

export type ZoomMeetingConfig = {
  meeting_number: number;
  meeting_password: string;
  sdk_key: string;
  signature: string;
};

export type MonthlyScheduleResponse = {
  month: string;
  schedules: {
    [date: string]: number;
  };
};

export type MonthlyScheduleParams = {
  month: number;
};

export type AppointmentsSummary = {
  upcoming_appointments: number;
  pending_appointments: number;
  past_appointments: number;
};

export type DayScheduleResponse = {
  day: string;
  schedules: Schedule[];
};

export type DayScheduleParams = {
  date: string;
};

export type Schedule = {
  id: number;
  appointment_no: string;
  service_id: number;
  challenge_id: number;
  status: string; // Add other possible statuses if needed
  appointment_time: string; // ISO date string
  appointment_type: string; // Add other possible types if needed
  service_type: string; // Add other possible service types if needed
  client_name: string;
  provider_name: string;
  provider_address: string;
  service_category: string;
  challenge: string;
};
export type CheckoutSessionResponse = {
  public_key: string;
  client_secret: string;
  connect_account_id: string;
};
