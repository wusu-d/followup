import { object, string } from 'yup';

import {
  PRO_ACADEMIC_BACKGROUND,
  PRO_BIO,
  PRO_EXPERIENCE,
} from '@/slices/professional-profile.slice';

export type AcademicBackgroundType = {
  [PRO_ACADEMIC_BACKGROUND]: string;
  [PRO_EXPERIENCE]: string;
  [PRO_BIO]: string;
};

export const academicBackgroundValidationSchema = object().shape({
  [PRO_ACADEMIC_BACKGROUND]: string().required(
    'Please enter your academic background'
  ),
  [PRO_EXPERIENCE]: string().required('Please enter your experience'),
  [PRO_BIO]: string().required('Please enter your bio'),
});
