import { object, string } from 'yup';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

export enum SelectUserRoleFormKeys {
  USER_ROLE = 'user-role',
}

export type SelectUserRoleFormFieldProps = {
  [SelectUserRoleFormKeys.USER_ROLE]: RolesEnum | '';
};

export const selectUserRoleInitialValues: SelectUserRoleFormFieldProps = {
  [SelectUserRoleFormKeys.USER_ROLE]: '',
};

export const selectUserValidationSchema = object({
  [SelectUserRoleFormKeys.USER_ROLE]: string()
    .required('Please select a role')
    .oneOf(Object.values(RolesEnum), 'Select a valid role'),
});
