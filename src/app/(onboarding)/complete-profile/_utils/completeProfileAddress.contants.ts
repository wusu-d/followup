import { object, string } from 'yup';

import {
  COMPLETE_PROFILE_ADDRESS,
  COMPLETE_PROFILE_CITY,
  COMPLETE_PROFILE_POSTAL_CODE,
  COMPLETE_PROFILE_PROVINCE,
} from '@/slices/complete-profile.slice';

export type CompleteProfileAddressType = {
  [COMPLETE_PROFILE_ADDRESS]: string;
  [COMPLETE_PROFILE_CITY]: string;
  [COMPLETE_PROFILE_PROVINCE]: string;
  [COMPLETE_PROFILE_POSTAL_CODE]: string;
};

export const completeProfileAddressValidationSchema = object({
  [COMPLETE_PROFILE_ADDRESS]: string().required('Please enter your address'),
  [COMPLETE_PROFILE_CITY]: string().required('Please enter your city'),
  [COMPLETE_PROFILE_PROVINCE]: string().required('Please enter your province'),
  [COMPLETE_PROFILE_POSTAL_CODE]: string().required(
    'Please enter your postal code'
  ),
});
