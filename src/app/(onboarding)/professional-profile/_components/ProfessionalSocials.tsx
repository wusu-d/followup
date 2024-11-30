'use client';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { array, object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import DeleteIcon from '@/components/icons/DeleteIcon';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAppDispatch } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import ProfessionalCompleteDialog from '@/app/(onboarding)/professional-profile/_components/ProfessionalCompleteDialog';
import { useCompleteOnboardingMutation } from '@/rtk-query/professional-profile';
import { useUpdateUserProfileMutation } from '@/rtk-query/profile';
import { updateProfessionalProfileState } from '@/slices/professional-profile.slice';

type SocialNetwork = 'Instagram' | 'Facebook' | 'X' | 'LinkedIn';

// interface SocialHandle {
//   network: SocialNetwork;
//   handle: string;
// }

const INITIAL_NETWORKS: SocialNetwork[] = [
  'Instagram',
  'Facebook',
  'X',
  'LinkedIn',
];

const ProfessionalSocials = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [completeOnboarding, { isLoading: isCompleteLoading }] =
    useCompleteOnboardingMutation();
  const validationSchema = object({
    handles: array()
      .of(
        object().shape({
          network: string().required('Network is required'),
          handle: string()
            .url('Link should start with https:// or http://')
            .required('Handle is required'),
        })
      )
      .min(1, 'At least one social handle is required'),
  });
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // const getInputProps = (id: keyof typeof formik.values) => {
  //   return {
  //     ...formik.getFieldProps(id),
  //     ...formik.getFieldMeta(id),
  //   };
  // };

  const initialValues = {
    handles: [{ network: 'Instagram' as SocialNetwork, handle: '' }],
  };

  // const handleSubmit = () => {
  //   openDialog();
  // };
  return (
    <>
      <Back
        onClick={() =>
          dispatch(updateProfessionalProfileState({ stage: 'availability' }))
        }
      />
      <OnboardingHeader title='Add Your Social Media Handles' content='' />
      <div className='max-w-3xl  mx-auto'>
        <div className='w-full mt-10'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            validateOnMount
            onSubmit={async (values) => {
              // console.log(values);
              // Handle form submission here
              const data = values.handles.reduce((acc, { network, handle }) => {
                acc[network.toLowerCase()] = handle;
                return acc;
              }, {} as Record<string, string>);

              console.log(values);

              try {
                await updateUserProfile({
                  social_links: data,
                }).unwrap();
                dispatch(updateProfessionalProfileState({ stage: 'email' }));
                // await completeOnboarding({}).unwrap();

                // openDialog();
              } catch (error) {
                logger(error);
              }
            }}
          >
            {({ values, isValid, setFieldValue }) => (
              <Form className=''>
                <FieldArray name='handles'>
                  {({ push, remove }) => (
                    <>
                      {values.handles.map((handle, index) => (
                        <div key={index} className=' flex gap-5 relative mb-5 '>
                          <Select
                            value={handle.network}
                            onValueChange={(value) =>
                              setFieldValue(`handles.${index}.network`, value)
                            }
                          >
                            <SelectTrigger className='h-[60px] bg-[#F2F5F8] border-none self-stretch'>
                              <SelectValue placeholder='Select Social Network' />
                            </SelectTrigger>
                            <SelectContent>
                              {INITIAL_NETWORKS.filter(
                                (network) =>
                                  network === handle.network ||
                                  !values.handles.some(
                                    (h) => h.network === network
                                  )
                              ).map((network) => (
                                <SelectItem key={network} value={network}>
                                  {network}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {/* {touched.handles?.[index]?.network &&
                            errors.handles?.[index]?.network && (
                              <div className='text-red-500 text-sm'>
                                {errors.handles[index].network}
                              </div>
                            )} */}
                          <Field name={`handles.${index}.handle`}>
                            {({ field, meta }: { field: any; meta: any }) => (
                              <Input
                                {...field}
                                {...meta}
                                placeholder='Enter Social Handle Link'
                              />
                            )}
                          </Field>
                          {/* {touched.handles?.[index]?.handle &&
                            errors.handles?.[index]?.handle && (
                              <div className='text-red-500 text-sm'>
                                {errors.handles[index].handle}
                              </div>
                            )} */}
                          {index > 0 && (
                            <DeleteIcon
                              className='cursor-pointer absolute -right-7 top-4'
                              fill='black'
                              onClick={() => remove(index)}
                            />
                            // <Button type='button' onClick={() => remove(index)}>
                            //   Remove
                            // </Button>
                          )}
                        </div>
                      ))}
                      {values.handles.length < INITIAL_NETWORKS.length && (
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() =>
                            push({ network: '' as SocialNetwork, handle: '' })
                          }
                          className='w-max mt-4 px-14'
                        >
                          Add More
                        </Button>
                      )}
                    </>
                  )}
                </FieldArray>
                <Button
                  type='submit'
                  className='w-max px-14 block mt-20 mx-auto'
                  disabled={!isValid}
                  isLoading={isLoading}
                >
                  Next
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ProfessionalCompleteDialog
        onOpenChange={closeDialog}
        open={isDialogOpen}
      />
    </>
  );
};

export default ProfessionalSocials;
