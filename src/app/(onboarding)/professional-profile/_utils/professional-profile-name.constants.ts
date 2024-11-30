import { object, string } from 'yup';

import { PRO_NAME, PRO_PROFESSION } from '@/slices/professional-profile.slice';

export type ProfessionalProfileNameType = {
  [PRO_NAME]: string;
  [PRO_PROFESSION]: string;
};

export const professionalProfileNameValidationSchema = object().shape({
  [PRO_NAME]: string().required('Please specify how you like to be addressed'),
  [PRO_PROFESSION]: string().required('Please enter your profession'),
});
