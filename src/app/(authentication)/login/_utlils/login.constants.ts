import { object, string } from 'yup';

export enum LoginFormFieldIds {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export type LoginFormFieldType = {
  [LoginFormFieldIds.EMAIL]: string;
  [LoginFormFieldIds.PASSWORD]: string;
};

export const loginFormInitialValues: LoginFormFieldType = {
  [LoginFormFieldIds.EMAIL]: '',
  [LoginFormFieldIds.PASSWORD]: '',
};

export const loginFormValidationSchema = object({
  [LoginFormFieldIds.EMAIL]: string()
    .required('Please enter your email')
    .email('Please enter a valid email'),
  [LoginFormFieldIds.PASSWORD]: string().required('Please enter your password'),
});
