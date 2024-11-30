import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { endpoints as professionalEndpoints } from '@/rtk-query/professional-profile';
import { UserServices } from '@/rtk-query/professional-profile/types';

// Reducer path name start
export const PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME =
  'professionalProfile' as const;
// Reducer path name end

export const PRO_NAME = 'name' as const;
export const PRO_PROFESSION = 'profession' as const;
export const PRO_ACADEMIC_BACKGROUND = 'academicBackground' as const;
export const PRO_EXPERIENCE = 'experience' as const;
export const PRO_BIO = 'bio' as const;
export const PRO_LICENSE = 'license' as const;
export const PRO_PROOF_EMPLOYMENT = 'proofPastEmployment' as const;
export const PRO_SERVICE_CHARGES = 'serviceCharges' as const;
export const PRO_CONSULT_CHARGE = 'consultationCharge' as const;
export const PRO_DIMENSION_SUPPORT = 'areaOfExpertise' as const;
export const PRO_EMAIL = 'email' as const;
export const PRO_AVAILABILITY = 'availability' as const;
export const PRO_APPOINTMENT = 'appointment' as const;
export const PRO_SOCIALS = 'socials';
export const PRO_EDIT_DIMENSIONS = 'userServices' as const;
export const PRO_EDIT_SERVICE_CHARGE = 'userCharges' as const;
export const PRO_EDIT_AVAILABILTY = 'userAvailability' as const;

export const professionalProfileStages = [
  'name',
  'academicBackground',
  'license',
  'proofPastEmployment',
  'areaOfExpertise',
  'serviceCharges',
  'email',
  'availability',
  'socials',
] as const;

const dayMap: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const appointmentType = ['hybrid', 'in-person', 'remote'];

export type ProfessionalProfileStagesType =
  (typeof professionalProfileStages)[number];

export type ProfessionalProfileState = {
  stage: ProfessionalProfileStagesType;
  [PRO_NAME]: string;
  [PRO_PROFESSION]: string;
  [PRO_ACADEMIC_BACKGROUND]: string;
  [PRO_EXPERIENCE]: string;
  [PRO_BIO]: string;
  [PRO_LICENSE]: File[];
  [PRO_PROOF_EMPLOYMENT]: File[];
  [PRO_DIMENSION_SUPPORT]: ServiceType[];
  [PRO_SERVICE_CHARGES]: Record<string, string>;
  [PRO_CONSULT_CHARGE]: string;
  [PRO_EMAIL]: string;
  [PRO_AVAILABILITY]: {
    day: string;
    openingHours: string;
    closingHours: string;
  }[];
  [PRO_APPOINTMENT]: string;
  [PRO_SOCIALS]: Record<string, string>;
  [PRO_EDIT_DIMENSIONS]: ServiceType[];
  [PRO_EDIT_SERVICE_CHARGE]: UserServices[];
  [PRO_EDIT_AVAILABILTY]: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  }[];
};

export const proProfileInitialState: ProfessionalProfileState = {
  stage: 'name',
  [PRO_NAME]: '',
  [PRO_PROFESSION]: '',
  [PRO_ACADEMIC_BACKGROUND]: '',
  [PRO_EXPERIENCE]: '',
  [PRO_BIO]: '',
  [PRO_LICENSE]: [],
  [PRO_PROOF_EMPLOYMENT]: [],
  [PRO_DIMENSION_SUPPORT]: [],
  [PRO_SERVICE_CHARGES]: {},
  [PRO_CONSULT_CHARGE]: '',
  [PRO_EMAIL]: '',
  [PRO_AVAILABILITY]: [],
  [PRO_APPOINTMENT]: '',
  [PRO_SOCIALS]: {},
  [PRO_EDIT_DIMENSIONS]: [],
  [PRO_EDIT_SERVICE_CHARGE]: [],
  [PRO_EDIT_AVAILABILTY]: [],
};

export const professionalProfileSlice = createSlice({
  name: PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  initialState: proProfileInitialState,
  reducers: {
    resetProfessionalProfileState: () => {
      return proProfileInitialState;
    },

    updateProfessionalProfileState: (
      state,
      action: PayloadAction<Partial<ProfessionalProfileState>>
    ) => {
      return { ...state, ...action.payload };
    },
    updateServiceCharge: (
      state,
      action: PayloadAction<{ id: number; price: number }>
    ) => {
      const { id, price } = action.payload;

      // Find the index of the service charge to update
      const chargeIndex = state[PRO_EDIT_SERVICE_CHARGE].findIndex(
        (charge) => charge.id === id
      );

      // If found, update the price
      if (chargeIndex !== -1) {
        state[PRO_EDIT_SERVICE_CHARGE][chargeIndex] = {
          ...state[PRO_EDIT_SERVICE_CHARGE][chargeIndex],
          price,
        };
      }
    },
    setAvailabilities: (state, action) => {
      state[PRO_EDIT_AVAILABILTY] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      professionalEndpoints.fetchUserServices.matchFulfilled,
      (state, action) => {
        state[PRO_EDIT_DIMENSIONS] = action.payload.map(({ id, name }) => ({
          id,
          name,
        }));
        state[PRO_EDIT_SERVICE_CHARGE] = action.payload;
      }
    );
    builder.addMatcher(
      professionalEndpoints.getProviderAvailability.matchFulfilled,
      (state, action) => {
        state[PRO_EDIT_AVAILABILTY] = action.payload.map((schedule) => ({
          id: schedule.id,
          day: dayMap[schedule.week_day],
          startTime: schedule.start_time.slice(0, -3), // Remove seconds
          endTime: schedule.end_time.slice(0, -3), // Remove seconds
        }));
      }
    );
  },
});

export type ServiceType = {
  id: number;
  name: string;
};
export const {
  resetProfessionalProfileState,
  updateProfessionalProfileState,
  updateServiceCharge,
  setAvailabilities,
} = professionalProfileSlice.actions;
export const professionalProfileReducer = professionalProfileSlice.reducer;
