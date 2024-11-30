export type ProviderDashboardResponse = {
  upcoming_appointments: number;
  pending_appointments: number;
  today_schedules: Schedule[]; // or you can make this more specific based on the schedule structure
};

type Schedule = {
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
