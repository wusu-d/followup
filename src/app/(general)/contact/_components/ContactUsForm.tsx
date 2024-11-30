'use client';
import { useFormik } from 'formik';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

const ContactUsForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const getSelectProps = (id: keyof typeof formik.values) => ({
    ...formik.getFieldHelpers(id),
    ...formik.getFieldProps(id),
  });

  const phoneInputProps = getSelectProps('phoneNumber');
  return (
    <form action=''>
      <div className='grid grid-cols-2 gap-5'>
        <Input
          id='firstName'
          type='text'
          required
          label='First Name'
          placeholder='Enter First Name'
          autoFocus
          {...getInputProps('firstName')}
        />
        <Input
          id='lastName'
          type='text'
          required
          label='Last Name'
          placeholder='Enter Last Name'
          {...getInputProps('lastName')}
        />
        <Input
          id='email'
          type='email'
          required
          label='Email Address'
          placeholder='Enter Email Address'
          {...getInputProps('email')}
        />
        <PhoneInput
          id='phoneNumber'
          onChange={phoneInputProps.setValue}
          value={phoneInputProps.value}
          label='Phone Number'
          autoFocus
        />{' '}
        <Textarea
          id='message'
          label='Message'
          placeholder='Enter Message'
          {...getInputProps('message')}
          containerClassName='col-span-2'
          className='resize-none'
        />
      </div>
      <div className='w-max mx-auto'>
        <Button
          type='submit'
          className='px-20 mt-10'
          disabled={!formik.isValid}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContactUsForm;
