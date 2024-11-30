import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Reducer path name start
export const COMPLETE_PROFILE_SLICE_REDUCER_NAME = 'completeProfile' as const;
// Reducer path name end

export const COMPLETE_PROFILE_FIRST_NAME = 'firstName' as const;
export const COMPLETE_PROFILE_LAST_NAME = 'lastName';
export const COMPLETE_PROFILE_BIO = 'bio';
export const COMPLETE_PROFILE_PHONE = 'phone';
export const COMPLETE_PROFILE_ADDRESS = 'address';
export const COMPLETE_PROFILE_CITY = 'city';
export const COMPLETE_PROFILE_PROVINCE = 'province';
export const COMPLETE_PROFILE_POSTAL_CODE = 'postalCode';
export const COMPLETE_PROFILE_PHOTO = 'photo';
export const COMPLETE_PROFILE_INSURANCE = 'insurance';

const completeProfileStages = [
  'name',
  'phone',
  'address',
  'photo',
  'insurance',
] as const;

export type CompleteProfileStageType = (typeof completeProfileStages)[number];

export type CompleteProfileState = {
  stage: CompleteProfileStageType;
  [COMPLETE_PROFILE_FIRST_NAME]: string;
  [COMPLETE_PROFILE_LAST_NAME]: string;
  [COMPLETE_PROFILE_BIO]: string;
  [COMPLETE_PROFILE_PHONE]: string;
  [COMPLETE_PROFILE_ADDRESS]: string;
  [COMPLETE_PROFILE_CITY]: string;
  [COMPLETE_PROFILE_PROVINCE]: string;
  [COMPLETE_PROFILE_POSTAL_CODE]: string;
  [COMPLETE_PROFILE_PHOTO]: File[];
  [COMPLETE_PROFILE_INSURANCE]?: boolean;
};

export const completeProfileInitialState: CompleteProfileState = {
  stage: 'name',
  [COMPLETE_PROFILE_FIRST_NAME]: '',
  [COMPLETE_PROFILE_LAST_NAME]: '',
  [COMPLETE_PROFILE_BIO]: '',
  [COMPLETE_PROFILE_PHONE]: '',
  [COMPLETE_PROFILE_ADDRESS]: '',
  [COMPLETE_PROFILE_CITY]: '',
  [COMPLETE_PROFILE_PROVINCE]: '',
  [COMPLETE_PROFILE_POSTAL_CODE]: '',
  [COMPLETE_PROFILE_PHOTO]: [],
};

export const completeProfileSlice = createSlice({
  name: COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  initialState: completeProfileInitialState,
  reducers: {
    resetCompleteProfile: () => {
      return completeProfileInitialState;
    },

    updateCompleteProfileState: (
      state,
      action: PayloadAction<Partial<CompleteProfileState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetCompleteProfile, updateCompleteProfileState } =
  completeProfileSlice.actions;

export const completeProfileReducer = completeProfileSlice.reducer;
