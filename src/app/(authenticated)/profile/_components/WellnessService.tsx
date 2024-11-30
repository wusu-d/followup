import React from 'react';

import AddWellnessButton from '@/app/(authenticated)/profile/_components/AddWellnessDimensionModal';
import EditProfessionalAvailability from '@/app/(authenticated)/profile/_components/EditAvailability';
import EditServiceCharges from '@/app/(authenticated)/profile/_components/EditServiceCharges';
import ServiceTile from '@/app/(authenticated)/profile/_components/ServiceTile';
import { useFetchUserServicesQuery } from '@/rtk-query/professional-profile';

const WellnessService = () => {
  const {
    data: userServices,
    isLoading: isUserServicesLoading,
    refetch,
  } = useFetchUserServicesQuery();
  // const { isLoading: availabilitiesLoading } =
  //   useGetProviderAvailabilityQuery();
  // const dispatch = useAppDispatch();

  // const {
  //   [PRO_EDIT_DIMENSIONS]: userServices1,
  //   [PRO_EDIT_SERVICE_CHARGE]: userServiceCharge,
  // } = useAppSelector((state) => state[PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]);

  // console.log(userServiceCharge);
  // const handleDeleteService = (service: ServiceType) => {
  //   const existingArea = userServices1.find((a) => a.name == service.name);
  //   if (existingArea && userServices1.length === 1) {
  //     return;
  //   }
  //   if (existingArea) {
  //     const newAreas = userServices1.filter((a) => a.name !== service.name);
  //     const newServiceCharges = userServiceCharge.filter(
  //       (sc) => sc.name !== service.name
  //     );

  //     dispatch(
  //       updateProfessionalProfileState({
  //         [PRO_EDIT_DIMENSIONS]: newAreas,
  //         [PRO_EDIT_SERVICE_CHARGE]: newServiceCharges,
  //       })
  //     );
  //   }
  // };
  return (
    <div className='mt-10 space-y-10'>
      {/* wellness */}
      <div>
        <div className='text-lg font-bold text-black flex justify-between items-center'>
          Wellness Dimension and Support
          <AddWellnessButton />
        </div>
        <div className='mt-3 grid grid-cols-2 gap-4 w-3/4'>
          {userServices?.map((service) => {
            return (
              <ServiceTile
                key={service.id}
                name={service.name}
                id={service.id}
                refetch={refetch}
                services={userServices}
              />
            );
          })}
        </div>
      </div>

      {/* service sharge */}
      <div>
        <p className='text-lg font-bold text-black flex justify-between items-center'>
          Service Charge
        </p>
        <EditServiceCharges />
      </div>

      <EditProfessionalAvailability />
    </div>
  );
};

export default WellnessService;
