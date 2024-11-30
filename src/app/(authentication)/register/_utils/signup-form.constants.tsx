import { boolean, object, ref, string } from 'yup';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

export enum SignupFormFieldIds {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
  ROLE = 'user_group',
  AGREE_TERMS = 'agreeTerms',
}

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])[^\s]{8,}$/;

export type SignupFormFieldType = {
  [SignupFormFieldIds.EMAIL]: string;
  [SignupFormFieldIds.PASSWORD]: string;
  [SignupFormFieldIds.CONFIRM_PASSWORD]: string;
  [SignupFormFieldIds.ROLE]: RolesEnum | '';
  [SignupFormFieldIds.AGREE_TERMS]: boolean;
};

export const signupFormInitialValues: SignupFormFieldType = {
  [SignupFormFieldIds.EMAIL]: '',
  [SignupFormFieldIds.PASSWORD]: '',
  [SignupFormFieldIds.CONFIRM_PASSWORD]: '',
  [SignupFormFieldIds.ROLE]: '',
  [SignupFormFieldIds.AGREE_TERMS]: false,
};

export const signupFormValidationSchema = object({
  [SignupFormFieldIds.EMAIL]: string()
    .required('Please enter your email')
    .email('Please enter a valid email'),

  [SignupFormFieldIds.PASSWORD]: string()
    .required('Please enter your password')
    .matches(PASSWORD_REGEX, {
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),

  [SignupFormFieldIds.CONFIRM_PASSWORD]: string()
    .required('Please re-enter your password')
    .oneOf([ref(SignupFormFieldIds.PASSWORD)], 'Passwords do not match'),

  [SignupFormFieldIds.AGREE_TERMS]: boolean()
    .required()
    .test('check if true', 'Agree to terms', (val) => {
      return !!val;
    }),
});
