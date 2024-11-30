'use client';
import { PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@/store';

import { updateSpecialistState } from '@/slices/specialists.slice';

const SpecialistLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateSpecialistState({ stage: 'home' }));
  }, [dispatch]);
  return <>{children}</>;
};

export default SpecialistLayout;
