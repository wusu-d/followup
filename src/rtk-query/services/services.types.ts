export type ChallengesType = {
  id: number;
  service_id: number;
  name: string;
  icon: string | null;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
};

export type ServiceProviderType = {
  user_id: number;
  full_name: string;
  profile_image: string;
  professional_name: string;
  profession: string;
  qualifications: string;
  service_id: number;
  service_charge: number;
  consultation_charge: number;
};

export type ProviderPortfolioType1 = {
  personal: {
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
    social_links: Record<string, string> | null;
    student_id_card: string | null;
    is_student: boolean;
    status: string;
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    has_insurance: boolean;
    full_name: string;
  };
  work: {
    professional_name: string;
    profession: string;
    qualifications: string;
    length_of_experience: string;
    bio: string;
    reg_license: string;
    past_employment_proof: string;
    consultation_charge: number;
    appointment_type: string;
  };
  services: {
    id: number;
    name: string;
    price: number;
  }[];
  wellness_challenges: any[]; // Assuming no structure, you can specify this further if necessary.
  clients: any[]; // Assuming no structure, you can specify this further if necessary.
};

export type ProviderPortfolioType = {
  personal: {
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
    social_links: Record<string, string> | null;
    student_id_card: string | null;
    is_student: boolean;
    status: string;
    created_at: number;
    updated_at: number;
    deleted_at: number | null;
    has_insurance: boolean;
    full_name: string;
  };
  work: {
    id: number;
    professional_name: string;
    profession: string;
    qualifications: string;
    length_of_experience: string;
    bio: string;
    reg_license: string;
    past_employment_proof: string;
    consultation_charge: number;
    appointment_type: string;
  };
  services: Array<{
    name: string;
  }>;
  wellness_challenges: Array<{
    name: string;
    icon: null | string;
  }>;
  client: {
    profile: {
      full_name: string;
      email: string;
      phone: string;
    };
    past_appointments: Array<{
      id: number;
      challenge: string;
      wellness: string;
      goal: string;
      action_plan: string;
      note: string;
    }>;
  };
  unavailable_time: Array<string>; // Adjust type based on actual structure if available
};

// "client": {
//   "profile": {
//       "full_name": "Jon Client",
//       "email": "dev.joseap@gmail.com",
//       "phone": "+4234567890"
//   },
//   "past_appointments": [
//       {
//           "id": 4,
//           "challenge": "Ambition",
//           "goal": "short-term",
//           "action_plan": "",
//           "note": "Lorem ipsum"
//       },
//       {
//           "id": 1,
//           "challenge": "Ambition",
//           "goal": "short-term",
//           "action_plan": "",
//           "note": "Lorem ipsum"
//       }
//   ]
// },
