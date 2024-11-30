import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AppointmentDetails,
  AppointmentType,
} from '@/rtk-query/appointments/types';

export const APPOINTMENTS_SLICE_REDUCER_NAME = 'appointments' as const;

const appointmentStages = ['home', 'payment', 'receipt'] as const;

export type AppointmentStageType = (typeof appointmentStages)[number];

export type AppointmentState = {
  stage: AppointmentStageType;
  canAccessPayment: boolean;
  service_charge?: number;
  total_charge?: number;
  appointmentDetails?: AppointmentDetails;
  appointment?: AppointmentType;
};

export const appointmentInitialState: AppointmentState = {
  stage: 'home',
  canAccessPayment: false,
  appointmentDetails: undefined,
  appointment: undefined,
  service_charge: 0,
  total_charge: 0,
};

const appointmentsSlice = createSlice({
  name: APPOINTMENTS_SLICE_REDUCER_NAME,
  initialState: appointmentInitialState,
  reducers: {
    updateAppointmentState: (
      state,
      action: PayloadAction<Partial<AppointmentState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
  // extraReducers: (builder) => {},
});

export const { updateAppointmentState } = appointmentsSlice.actions;

export const appointmentsReducer = appointmentsSlice.reducer;
