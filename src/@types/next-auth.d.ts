import { DefaultJWT } from 'next-auth/jwt';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

declare module 'next-auth' {
  interface Session {
    access_token: string;
    user_groups: RolesEnum[];
    profile_status: string;
    profile_data?;
    onboarding_stage?: {
      personal_profile: boolean;
      subscription: boolean;
    };
  }

  interface User {
    access_token: string;
    user_groups: RolesEnum[];
    profile_status: string;
    profile_data?;
    onboarding_stage?: {
      personal_profile: boolean;
      subscription: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    data: {
      access_token: string;
      user_groups: RolesEnum[];
      profile_status: string;
      profile_data?;
      onboarding_stage?: {
        personal_profile: boolean;
        subscription: boolean;
      };
    };
  }
}
