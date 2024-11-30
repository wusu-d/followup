'use client';
import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@/store';

import { updateSpecialistState } from '@/slices/specialists.slice';
import { updateAppointmentState } from '@/slices/appointments.slice';

const AppointmentDetailsLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateAppointmentState({ stage: 'home' }));
  }, [dispatch]);
  return <>{children}</>;
};

export default AppointmentDetailsLayout;
