import { object, string } from 'yup';

import {
  COMPLETE_PROFILE_BIO,
  COMPLETE_PROFILE_FIRST_NAME,
  COMPLETE_PROFILE_LAST_NAME,
} from '@/slices/complete-profile.slice';

export type CompleteProfileNameFieldType = {
  [COMPLETE_PROFILE_FIRST_NAME]: string;
  [COMPLETE_PROFILE_LAST_NAME]: string;
  [COMPLETE_PROFILE_BIO]: string;
};

export const completeProfileNameValidationSchema = object({
  [COMPLETE_PROFILE_FIRST_NAME]: string().required(
    'Please enter your first name'
  ),
  [COMPLETE_PROFILE_LAST_NAME]: string().required(
    'Please enter your last name'
  ),
  [COMPLETE_PROFILE_BIO]: string(),
});
