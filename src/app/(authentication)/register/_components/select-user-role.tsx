'use client';

import { useFormik } from 'formik';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { PiCheckCircleFill } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import FollowUpLogo from '@/components/ui/followup-logo';

import {
  ROLE_SEARCH_PARAM_KEY_CONSTANT,
  RolesEnum,
} from '@/app/(authentication)/register/_utils/register.constants';
import {
  SelectUserRoleFormKeys,
  selectUserRoleInitialValues,
  selectUserValidationSchema,
} from '@/app/(authentication)/register/_utils/select-user-role.constants';

import MemberImage from '~/images/register-member-image.png';
import ProviderImage from '~/images/register-provider-image.png';

const rolesData: { title: string; value: RolesEnum; image: StaticImageData }[] =
  [
    {
      image: MemberImage,
      title: 'Wellness Supporters',
      value: RolesEnum.MEMBER,
    },
    {
      image: ProviderImage,
      title: 'Wellness Providers',
      value: RolesEnum.SERVICE_PROVIDER,
    },
  ];

const SelectUserRole = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: selectUserRoleInitialValues,
    validationSchema: selectUserValidationSchema,
    validateOnMount: true,
    onSubmit: (data) => {
      router.replace(
        `/register/?${ROLE_SEARCH_PARAM_KEY_CONSTANT}=${
          data[SelectUserRoleFormKeys.USER_ROLE]
        }`
      );
    },
  });

  return (
    <section className='w-full p-8 xl:p-12 grid place-items-center'>
      <div className='border w-full p-8 min-h-[calc(100dvh-6rem)] flex flex-col items-center justify-center text-center gap-6 rounded-[20px]'>
        <div className='w-2/12 mx-auto'>
          <FollowUpLogo className='text-[#052536]' />
        </div>

        <h1 className='h2 text-primary-black'>Select Your Role</h1>
        <p className='w-[32%] text-light-gray'>
          Are you seeking support or offering support ?
        </p>

        <form onSubmit={formik.handleSubmit} className='w-full'>
          <div className='w-3/5 mx-auto grid grid-cols-2 gap-4'>
            {rolesData.map(({ image, title, value }) => {
              const isSelected =
                value === formik.values[SelectUserRoleFormKeys.USER_ROLE];
              return (
                <button
                  type='button'
                  onClick={() =>
                    formik.setFieldValue(
                      SelectUserRoleFormKeys.USER_ROLE,
                      value,
                      true
                    )
                  }
                  key={value}
                  className={cn(
                    'flex flex-col gap-10 min-h-72 py-6 rounded-[20px] relative border-light-green justify-center items-center border',
                    [isSelected && 'border-primary-green border-[2px]']
                  )}
                >
                  <Image
                    src={image}
                    alt={title}
                    width={115.81}
                    height={91.6}
                    className='w-2/5 h-auto'
                  />
                  <span className='h4'>{title}</span>

                  <PiCheckCircleFill
                    className={cn(
                      'absolute top-4 right-4 text-primary-green text-4xl',
                      [!isSelected && 'hidden']
                    )}
                  />
                </button>
              );
            })}
          </div>

          <Button
            type='submit'
            className='w-5/12 mt-8'
            disabled={!formik.isValid}
          >
            Next
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SelectUserRole;
