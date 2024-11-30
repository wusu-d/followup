export interface ProfileResponse {
  status: string;
  message: string;
  user_group: string[];
  onboarding_stage: {
    personal_profile_completed: boolean;
    subscription_completed: boolean;
  };
  data: {
    personal: {
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
      social_links: Record<string, string>;
      student_id_card: string | null;
      is_student: boolean;
      status: string;
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
      bank_email: string;
    };
  };
}
