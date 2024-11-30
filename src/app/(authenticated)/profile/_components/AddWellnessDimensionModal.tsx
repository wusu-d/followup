import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import logger from '@/lib/logger';
import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import {
  useFetchUserServicesQuery,
  useGetServicesQuery,
  useUpdateUserServicesMutation,
} from '@/rtk-query/professional-profile';
import { UserServices } from '@/rtk-query/professional-profile/types';
import { ServiceType } from '@/slices/professional-profile.slice';

const AddWellnessButton = () => {
  const [updateServices, { isLoading: updateServicesLoading }] =
    useUpdateUserServicesMutation();
  const { data: areas, isLoading } = useGetServicesQuery();

  const [step, setStep] = useState(0);
  const {
    data: userServices,
    isLoading: isUserServicesLoading,
    refetch,
  } = useFetchUserServicesQuery(undefined, { refetchOnMountOrArgChange: true });
  const [addedServiceCharge, setAddedServiceCharge] = useState<UserServices[]>(
    []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdate = (area: ServiceType) => {
    // Don't allow modifying existing services
    if (userServices?.find((service) => service.name === area.name)) {
      return;
    }

    const existingArea = addedServiceCharge.find((a) => a.name == area.name);
    if (existingArea) {
      const newAreas = addedServiceCharge.filter((a) => a.name !== area.name);
      setAddedServiceCharge(
        newAreas.map((service) => ({
          id: service.id,
          name: service.name,
          price:
            addedServiceCharge.find((sc) => sc.name === service.name)?.price ||
            0,
        }))
      );
    } else {
      setAddedServiceCharge([
        ...addedServiceCharge,
        {
          id: area.id,
          name: area.name,
          price: 0,
        },
      ]);
    }
  };

  useEffect(() => {
    // Only set new services, excluding existing ones
    const newServices = addedServiceCharge.filter(
      (service) => !userServices?.find((us) => us.name === service.name)
    );
    // Only update if the arrays are different
    if (JSON.stringify(newServices) !== JSON.stringify(addedServiceCharge)) {
      setAddedServiceCharge(newServices);
    }
  }, [userServices]);

  const initialValues = addedServiceCharge
    .filter((service) => !userServices?.find((us) => us.name === service.name))
    .reduce((values, item) => {
      values[item.name] = item.price;
      return values;
    }, {} as { [key: string]: number });

  const validationSchema = Yup.object().shape(
    addedServiceCharge
      .filter(
        (service) => !userServices?.find((us) => us.name === service.name)
      )
      .reduce((schema, item) => {
        schema[item.name] = Yup.number()
          .min(1, 'Price must be non-negative')
          .required('Price is required');
        return schema;
      }, {} as { [key: string]: Yup.NumberSchema })
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const data = addedServiceCharge
        .filter(
          (service) => !userServices?.find((us) => us.name === service.name)
        )
        .map((service) => ({
          service_id: service.id,
          price: values[service.name],
        }));
      try {
        await updateServices(data).unwrap();
        const result = await refetch();
        if (result.isSuccess) {
          setIsDialogOpen(false);
        }
      } catch (error) {
        logger(error);
      }
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setStep(0);
      setAddedServiceCharge([]);
    }
  };

  const filteredServices = addedServiceCharge.filter(
    (service) => !userServices?.find((us) => us.name === service.name)
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className='h-5 w-5 cursor-pointer text-white font-semibold bg-[#16C098] rounded-md flex items-center justify-center'>
          +
        </button>
      </DialogTrigger>
      <DialogContent className='rounded-2xl max-w-xl p-10 border-none outline-none'>
        <DialogTitle className='text-2xl text-[#111] font-bold mb-5 text-center'>
          Choose Wellness and Dimension Supports
        </DialogTitle>
        {step === 0 && (
          <>
            <div className='mt-5 w-full grid grid-cols-6 gap-4'>
              {areas?.map((area, idx) => {
                const isExistingService = userServices?.find(
                  (service) => service.name === area.name
                );
                const selected = addedServiceCharge?.find(
                  (a) => area.name === a.name
                );
                return (
                  <button
                    key={idx}
                    disabled={!!isExistingService}
                    className={cn(
                      'w-full col-span-2 rounded-lg text-sm',
                      'bg-[#F2F5F8] border border-[#F2F5F8] [&:nth-last-child(2)]:col-span-3 last:col-span-3 [&:nth-last-child(2)]:ml-auto',
                      'px-2 py-3',
                      'focus-visible:ring-primary-green/50 focus-visible:ring focus-visible:outline-0',
                      [
                        selected &&
                          'bg-primary-green/10 border border-primary-green',
                      ],
                      [
                        isExistingService &&
                          'opacity-50 cursor-not-allowed bg-gray-200',
                      ]
                    )}
                    onClick={() => handleUpdate(area)}
                  >
                    {area.name}
                  </button>
                );
              })}
            </div>
            <DialogFooter>
              <div className='grid place-items-center'>
                <Button
                  onClick={() => setStep(1)}
                  className='px-24'
                  disabled={filteredServices.length === 0}
                >
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
        {step === 1 && (
          <>
            <form
              onSubmit={formik.handleSubmit}
              className='w-full flex flex-col gap-5 mt-5 '
            >
              <div className='grid grid-cols-[auto_1fr] gap-4'>
                {filteredServices.map((charge) => {
                  return (
                    <React.Fragment key={charge.id}>
                      <label
                        htmlFor={charge.name}
                        className='bg-[#E1E1E166] h-max py-4 text-lg border rounded-lg px-3'
                      >
                        {charge?.name}
                      </label>
                      <Input
                        type='number'
                        id={charge.name}
                        isMoneyInput
                        name={charge.name}
                        placeholder='Enter Service Charge'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={`${formik.values[charge.name]}`}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className='grid place-items-center'>
                <Button
                  disabled={!formik.isValid || filteredServices.length === 0}
                  isLoading={updateServicesLoading}
                  type='submit'
                  className='px-24'
                >
                  Save
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddWellnessButton;
