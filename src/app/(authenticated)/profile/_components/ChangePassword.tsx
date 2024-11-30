import { useFormik } from 'formik';
import { toast } from 'sonner';
import { object, ref, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import { PASSWORD_REGEX } from '@/app/(authentication)/register/_utils/signup-form.constants';
import { useUpdatePasswordMutation } from '@/rtk-query/auth';

const validationSchema = object({
  oldPassword: string().required('Please enter your current password'),
  newPassword: string()
    .required('Please enter your new password')
    .matches(PASSWORD_REGEX, {
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),

  confirmPassword: string()
    .required('Please re-enter your new password')
    .oneOf([ref('newPassword')], 'Passwords do not match'),
});

const ChangePassword = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updatePassword({
          old_password: values.oldPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
        }).unwrap();
        toast.success('Password Changed Successfully');
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'data' in error) {
          toast.error(
            <p className='text-red-500 font-bold rounded-md w-full'>
              {(error.data as any)?.messages?.error}
            </p>
          );
        } else {
          toast.error(
            <p className='text-red-500 font-bold rounded-md w-full'>
              An error occurred
            </p>
          );
        }
      }
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };
  return (
    <div className='pt-9'>
      <form onSubmit={formik.handleSubmit} className='space-y-5 w-3/5'>
        <Input
          placeholder='Enter Old Password'
          id='oldPassword'
          required
          label='Old Password'
          type='password'
          autoComplete='off'
          autoCorrect='off'
          {...getInputProps('oldPassword')}
        />
        <Input
          placeholder='Enter New Password'
          id='newPassword'
          required
          label='New Password'
          type='password'
          autoComplete='off'
          autoCorrect='off'
          {...getInputProps('newPassword')}
        />
        <Input
          placeholder='Re-type New Password'
          id='confirmPassword'
          required
          label='Confirm New Password'
          type='password'
          autoComplete='off'
          autoCorrect='off'
          {...getInputProps('confirmPassword')}
        />
        <Button
          type='submit'
          className='px-14 mt-10'
          disabled={!formik.isValid}
          isLoading={isLoading}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
