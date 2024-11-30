export type ProjectType = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_by: number;
  creator: string;
  created_by_you: boolean;
  progress_stage: {
    value: number;
    unit: string; // Could be restricted to "percentage" if always the same
  };
};
export type ProjectDetailResponse = {
  id: number;
  title: string;
  goal: string;
  description: string;
  image: string;
  documents: {
    ext: string;
    name: string;
    path: string;
    uploaded_by: string | number;
  }[];
  created_by: number;
  client_id: number;
  status: string;
  created_at: number; // Unix timestamp
  updated_at: number; // Unix timestamp
  deleted_at: number | null;
  tasks: Task[];
  notes: Note[];
  graph_points: GraphPoints;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  expected_completion_date: string; // Can be Date if converted
  status: string;
  created_at: number; // Unix timestamp
  added_by: number;
};

export type Note = {
  id: number;
  task_id: number;
  note: string;
  added_by: number;
  created_at: number; // Unix timestamp
};

export type UpdateNoteParams = {
  data: Record<string, number | string>;
  noteId: string;
};

export type AddTaskParams = {
  project_id: number;
  title: string;
  completion_date: string | undefined; // Can also be Date if you want to handle it as a Date object
  description: string;
};

export type UpdateTaskParams = {
  data: Record<string, number | string | undefined>;
  taskId: string;
};

export type GetClientResponse = {
  client_id: number;
  full_name: string;
  status: string;
  challenge: string;
  service_category: string;
  progress_stage: {
    value: number;
    unit: string; // Update with valid units as needed
  };
};

export type TaskByDateResponse = {
  id: number;
  project_id: number;
  title: string;
  description: string;
  expected_completion_date: string; // ISO date string
  completion_date: string; // ISO date string
  added_by: number;
  status: string; // limited to specific status strings
  created_at: number; // timestamp
  updated_at: number; // timestamp
  deleted_at: number | null; // nullable timestamp
  client_id: string; // string type for client_id
};

export type TaskByDateParams = {
  date: string;
};

export type ProjectOverview = {
  id: number;
  title: string;
  completion_date: string;
  status: string;
};

export type ClientOverview = {
  client_id: number;
  full_name: string;
  profile_image: string;
  status: string;
  projects: ProjectOverview[];
};

export type GraphPoints = {
  completed_tasks: {
    [key: string]: number;
  };
  pending_tasks: {
    [key: string]: number;
  };
};

export type ProjectItem = {
  id: number;
  title: string;
  status: 'completed' | 'pending';
  graph_points: GraphPoints;
};

export type ProjectGraphResponse = ProjectItem[];

export type GetClientProjectsResponse = {
  client_profile: {
    id: number;
    user_id: number;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    bio: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    profile_image: string;
    social_links: {
      Twitter?: string;
      Facebook?: string;
      LinkedIn?: string;
    };
    student_id_card: string | null;
    is_student: boolean;
    status: string;
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    has_insurance: boolean;
    full_name: string;
  };
  projects: ProjectType[];
  last_appointment: {
    id: number;
    appointment_no: string;
    service_id: number;
    challenge_id: number;
    provider_id: number;
    client_id: number;
    appointment_time: string;
    appointment_type: string;
    service_type: string;
    goal: string;
    note: string;
    convenience_charge: number;
    consultation_charge: number;
    service_charge: number;
    total_charge: number;
    invoice: string | null;
    payment_mode: string | null;
    meeting_link: string;
    status: string;
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    payment_status: string;
    payment_id: number;
    coupon_id: number | null;
    cancellation_reason: string | null;
    cancelled_by: string | null;
    client_name: string;
    client_image: string;
    provider_name: string;
    provider_image: string;
    provider_address: string;
    service_category: string;
    challenge: string;
  };
};

export type GetProjectResponse = {
  client_profile: null;
  last_appointment: null;
  projects: ProjectType[];
};
