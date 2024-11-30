import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { endpoints } from '@/rtk-query/appointments';

// Reducer path name start
export const BOOK_APPOINTMENT_SLICE_REDUCER_NAME = 'bookAppointment' as const;
// Reducer path name end

export const BOOK_APPOINTMENT_DATE = 'date' as const;
export const BOOK_APPOINTMENT_TIME = 'time' as const;
export const BOOK_APPOINTMENT_SERVICE_TYPE = 'serviceType' as const;
export const BOOK_APPOINTMENT_APPOINTMENT_TYPE = 'appointmentType' as const;
export const BOOK_APPOINTMENT_GOAL = 'goal' as const;
export const BOOK_APPOINTMENT_NOTE = 'note' as const;
export const BOOK_APPOINTMENT_SERVICE_ARRAY = 'serviceArray' as const;
export const BOOK_APPOINTMENT_PAYMENT_SUMMARY = 'paymentSumary' as const;

const bookAppointmentStages = [
  'date',
  'time',
  'serviceType',
  'appointmentType',
  'inputForm',
] as const;

interface ChargePayload {
  consultationCharge: number;
  serviceCharge: number;
}

export type BookAppointmentStageType = (typeof bookAppointmentStages)[number];

export type ServiceType = {
  name: string;
  price: number;
};

export type BookAppointmentState = {
  stage: BookAppointmentStageType;
  [BOOK_APPOINTMENT_DATE]: Date | null;
  [BOOK_APPOINTMENT_TIME]: string;
  [BOOK_APPOINTMENT_SERVICE_TYPE]: ServiceType | null;
  [BOOK_APPOINTMENT_APPOINTMENT_TYPE]: string;
  [BOOK_APPOINTMENT_GOAL]: string;
  [BOOK_APPOINTMENT_NOTE]: string;
  [BOOK_APPOINTMENT_SERVICE_ARRAY]: ServiceType[];
  [BOOK_APPOINTMENT_PAYMENT_SUMMARY]: Record<string, number> | null;
};

export const bookAppointmentInitialState: BookAppointmentState = {
  stage: 'date',
  [BOOK_APPOINTMENT_DATE]: null,
  [BOOK_APPOINTMENT_TIME]: '',
  [BOOK_APPOINTMENT_SERVICE_TYPE]: null,
  [BOOK_APPOINTMENT_APPOINTMENT_TYPE]: '',
  [BOOK_APPOINTMENT_GOAL]: '',
  [BOOK_APPOINTMENT_NOTE]: '',
  [BOOK_APPOINTMENT_PAYMENT_SUMMARY]: null,
  [BOOK_APPOINTMENT_SERVICE_ARRAY]: [
    {
      name: 'Consultation',
      price: 0,
    },
    {
      name: 'Service',
      price: 0,
    },
  ],
};

export const bookAppointmentSlice = createSlice({
  name: BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  initialState: bookAppointmentInitialState,
  reducers: {
    resetBookAppointment: (state) => {
      state.stage = 'date';
      state[BOOK_APPOINTMENT_DATE] = null;
      state[BOOK_APPOINTMENT_TIME] = '';
      state[BOOK_APPOINTMENT_SERVICE_TYPE] = null;
      state[BOOK_APPOINTMENT_APPOINTMENT_TYPE] = '';
      state[BOOK_APPOINTMENT_GOAL] = '';
      state[BOOK_APPOINTMENT_NOTE] = '';
    },
    updateBookAppointmentState: (
      state,
      action: PayloadAction<Partial<BookAppointmentState>>
    ) => {
      return { ...state, ...action.payload };
    },
    setServiceArrayState: (state, action: PayloadAction<ChargePayload>) => {
      state[BOOK_APPOINTMENT_SERVICE_ARRAY] = [
        {
          name: 'Consultation',
          price: action.payload.consultationCharge,
        },
        {
          name: 'Service',
          price: action.payload.serviceCharge,
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      endpoints.createAppointment.matchFulfilled,
      (state, action) => {
        state[BOOK_APPOINTMENT_PAYMENT_SUMMARY] = action.payload;
      }
    );
  },
});

export const {
  resetBookAppointment,
  updateBookAppointmentState,
  setServiceArrayState,
} = bookAppointmentSlice.actions;

export const bookAppointmentReducer = bookAppointmentSlice.reducer;
