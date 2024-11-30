'use client';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

import { useAppDispatch, useAppSelector } from '@/store';

import OnboardingHeader from '@/app/(authentication)/_components/OnboardingHeader';
import Back from '@/app/(onboarding)/_components/Back';
import { useGetServicesQuery } from '@/rtk-query/professional-profile';
import {
  PRO_DIMENSION_SUPPORT,
  PRO_SERVICE_CHARGES,
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  ServiceType,
  updateProfessionalProfileState,
} from '@/slices/professional-profile.slice';
// const possibleAreas = [
//   'Emotional Wellness',
//   'Enviromental Wellness',
//   'Social Wellness',
//   'Financial Wellness',
//   'Intellectual Wellness',
//   'Vocational Wellness',
//   'Physical Wellness',
//   'Spiritual Wellness',
// ] as const;
const AreaOfExpertise = () => {
  const { data: areas, isLoading } = useGetServicesQuery();

  const {
    [PRO_DIMENSION_SUPPORT]: areaofExpertise,
    [PRO_SERVICE_CHARGES]: serviceCharges,
  } = useAppSelector((state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]);
  const dispatch = useAppDispatch();
  // const []

  const handleUpdate = (area: ServiceType) => {
    const existingArea = areaofExpertise.find((a) => a.name == area.name);

    if (existingArea) {
      const newAreas = areaofExpertise.filter((a) => a.name !== area.name);
      dispatch(
        updateProfessionalProfileState({
          [PRO_DIMENSION_SUPPORT]: newAreas,
        })
      );
    } else {
      dispatch(
        updateProfessionalProfileState({
          [PRO_DIMENSION_SUPPORT]: Array.from(
            new Set([...areaofExpertise, area])
          ),
        })
      );
    }
  };

  function handleProceed() {
    const copyServiceCharges = Object.assign({}, serviceCharges);

    // Add new areas to service charges
    areaofExpertise.forEach((area) => {
      if (!(area.id in copyServiceCharges)) {
        copyServiceCharges[area.id] = '';
      }
    });

    // Remove unselected areas from service charges
    for (const service in serviceCharges) {
      const selectedArea = areaofExpertise.find(
        (a) => a.id.toString() === service
      );
      if (!selectedArea) {
        delete copyServiceCharges[service];
      }
    }

    // Dispatch state update
    dispatch(
      updateProfessionalProfileState({
        stage: 'serviceCharges',
        [PRO_SERVICE_CHARGES]: copyServiceCharges,
      })
    );
  }

  return (
    <>
      <Back
        onClick={() =>
          dispatch(
            updateProfessionalProfileState({ stage: 'proofPastEmployment' })
          )
        }
      />
      <OnboardingHeader
        title='Choose Wellness and Dimension Supports'
        content='Your services must align with the eight dimensions of wellness. You may choose up to eight of these dimensions'
      />

      <div className='mt-5 w-full lg:w-4/5 xl:w-3/5 mx-auto grid grid-cols-6 gap-4'>
        {areas?.map((area, idx) => {
          const selected = areaofExpertise.find((a) => area.name === a.name);
          return (
            <button
              key={idx}
              className={cn(
                'w-full col-span-2 rounded-lg',
                'bg-[#F2F5F8] border border-[#F2F5F8] [&:nth-last-child(2)]:col-span-3 last:col-span-3 [&:nth-last-child(2)]:ml-auto',
                'px-2 py-3',
                'focus-visible:ring-primary-green/50 focus-visible:ring focus-visible:outline-0',
                [selected && 'bg-primary-green/10 border border-primary-green']
              )}
              onClick={() => handleUpdate(area)}
            >
              {area.name}
            </button>
          );
        })}
      </div>

      <Button
        disabled={!areaofExpertise.length}
        type='submit'
        className='w-max px-20 mt-10 mx-auto block'
        onClick={handleProceed}
      >
        Next
      </Button>
    </>
  );
};

export default AreaOfExpertise;
