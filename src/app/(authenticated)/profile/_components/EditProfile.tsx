import { useFormik } from 'formik';
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { boolean, mixed, object, string } from 'yup';

import style from '../style/EditProfile.module.scss';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfilePhotoMutation,
} from '@/rtk-query/profile';
import { compressImage } from '@/utils/compress-image.utils';

const EditProfile = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [updateUserPhoto, { isLoading: isPictureLoading }] =
    useUpdateUserProfilePhotoMutation();
  const [hasInsurance, setHasInsurance] = useState<boolean | undefined>();

  const {
    data: profileData,
    refetch,
    isLoading: isUserProfileLoading,
  } = useGetUserProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (profileData)
      setHasInsurance(profileData?.data?.personal?.has_insurance);
  }, [profileData]);

  const validationSchema = object({
    photo: mixed().required('Profile image is required'),
    firstName: string().required('Please enter your first name'),
    lastName: string().required('Please enter your last name'),
    bio: string(),
    address: string().required('Please enter your address'),
    city: string().required('Please enter your city'),
    province: string().required('Please enter your province'),
    postalCode: string().required('Please enter your postal code'),
    phoneNumber: string()
      .required('Please enter your phone number')
      .test(
        'check if is possible phone number',
        'Please enter a valid phone number',
        (value) => {
          return isPossiblePhoneNumber(value);
        }
      ),
    email: string().required(),
    insurance: boolean().required(),
  });

  const formik = useFormik({
    initialValues: {
      photo: profileData?.data?.personal?.profile_image || null,
      firstName: profileData?.data?.personal?.first_name || '',
      lastName: profileData?.data?.personal?.last_name || '',
      email: profileData?.data?.personal?.email || '',
      phoneNumber: profileData?.data?.personal?.phone || '',
      address: profileData?.data?.personal?.address || '',
      city: profileData?.data?.personal?.city || '',
      province: profileData?.data?.personal?.province || '',
      postalCode: profileData?.data?.personal?.postal_code || '',
      bio: profileData?.data?.personal?.bio || '',
      insurance: hasInsurance,
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateUserProfile({
          first_name: values.firstName,
          last_name: values.lastName,
          bio: values.bio,
          phone: values.phoneNumber,
          has_insurance: values.insurance,
          address: values.address,
          city: values.city,
          province: values.province,
          postal_code: values.postalCode,
        }).unwrap();
        if (values.photo) {
          if (profileData?.data?.personal?.profile_image !== values.photo) {
            const formData = new FormData();
            formData.append('photo', values.photo[0]);
            try {
              await updateUserPhoto(formData).unwrap();
            } catch (error) {
              logger(error);
            }
          }
        }
        toast.success('Profile Updated Successfully');
        refetch();
      } catch (error) {
        logger(error);
      }
      if (values.photo) console.log(values.photo[0]);
    },
  });

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // logic

      const compressedFile = await compressImage(file);

      if (!compressedFile) {
        return null;
      }

      formik.setFieldValue('photo', [compressedFile], true);
    }
  }

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
  const insuranceInputProps = getInputProps('insurance');
  const setInsuranceInputValue = getSelectProps('insurance').setValue;
  return (
    <div>
      <p className='mb-5 mt-8 text-xl font-extrabold text-black'>
        Personal Details
      </p>
      <form onSubmit={formik.handleSubmit} className='mt-9'>
        <div
          className={cn(
            'max-w-52 mr-auto mt-4 aspect-square rounded-full relative',
            style.edit_profile_image_container
          )}
        >
          <div className='relative focus-within:ring ring-primary-green/10 overflow-hidden size-full rounded-full bg-[#F3F6F9]'>
            {!formik.values.photo && (
              <label
                htmlFor='photo'
                className='text-primary-black/10 size-full grid place-items-center text-6xl rounded-full'
              >
                <CameraIcon />
              </label>
            )}

            {formik.values.photo && (
              <>
                <Image
                  alt='Profile photo'
                  src={
                    typeof formik.values.photo === 'string'
                      ? formik.values.photo // Display URL from backend
                      : URL.createObjectURL(formik.values.photo[0]) // Display uploaded file
                  }
                  fill
                  className='object-cover rounded-full overflow-hidden'
                />
              </>
            )}

            <input
              type='file'
              id='photo'
              accept='image/*'
              className='opacity-0 absolute top-0 left-0 size-full'
              onChange={handleFileUpload}
            />
          </div>

          {formik.values.photo && (
            <label
              htmlFor='photo'
              className={`${cn(
                `${style.edit_profile_image_button}`,
                'cursor-pointer bg-[#052536] text-primary-green text-xl border-2 border-white'
              )}`}
            >
              <CameraIcon />
            </label>
          )}
        </div>
        <div className='grid gap-x-5 gap-y-[30px] grid-cols-2 mt-10'>
          <Input
            id='firstName'
            type='text'
            required
            label='First Name'
            readOnly
            placeholder='Enter First Name'
            autoFocus
            {...getInputProps('firstName')}
          />
          <Input
            id='lastName'
            type='text'
            required
            label='Last Name'
            readOnly
            placeholder='Enter Last Name'
            {...getInputProps('lastName')}
          />
          <Input
            id='email'
            type='email'
            required
            label='Email Address'
            readOnly
            placeholder='Enter Email Address'
            {...getInputProps('email')}
          />
          <PhoneInput
            id='phoneNumber'
            onChange={phoneInputProps.setValue}
            value={phoneInputProps.value}
            label='Phone Number'
            readOnly
            autoFocus
          />
          <Input
            id='address'
            type='text'
            required
            label='Address'
            placeholder='Enter Address'
            autoFocus
            {...getInputProps('address')}
          />
          <Input
            id='city'
            type='text'
            required
            label='City'
            placeholder='Enter City'
            {...getInputProps('city')}
          />
          <Input
            id='province'
            type='text'
            required
            label='Province'
            placeholder='Enter Province'
            {...getInputProps('province')}
          />
          <Input
            id='postalCode'
            type='text'
            required
            label='Postal Code'
            placeholder='Enter Postal Code'
            {...getInputProps('postalCode')}
          />
          <Textarea
            id='bio'
            label='Bio'
            placeholder='Enter Bio'
            {...getInputProps('bio')}
            containerClassName='col-span-2'
            className='resize-none'
          />
        </div>
        <div className='mt-5'>
          <p className='font-bold text-lg text-[#052536]'>
            Do you have insurance?
          </p>
          <p className='text-[#6B6B6B] text-sm'>
            FollowUp is available at no cost to you. Insurance isn't necessary
            to access our platform, although some providers might request it.
          </p>
          <RadioGroup
            id='insurance'
            {...getInputProps('insurance')}
            onValueChange={(value) => {
              setHasInsurance(value === 'true');
              formik.setFieldValue('insurance', value === 'true');
            }}
            className='grid grid-cols-2 gap-2 mt-2 w-2/5'
          >
            <div
              className={cn(
                'flex items-center justify-start gap-2 font-medium bg-white px-3 py-3.5 rounded-[10px]'
              )}
            >
              <RadioGroupItem
                id='insurance'
                value='true'
                checked={formik.values.insurance}
              />
              Yes
            </div>
            <div
              className={cn(
                'flex items-center justify-start gap-2 font-medium bg-white px-3 py-3.5 rounded-[10px]'
              )}
            >
              <RadioGroupItem
                id='insurance'
                value='false'
                checked={!formik.values.insurance}
              />
              No
            </div>
          </RadioGroup>
        </div>
        <Button
          type='submit'
          className='px-14 mt-10'
          isLoading={isLoading}
          disabled={!formik.isValid}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
