import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { endpoints } from '@/rtk-query/profile';
import { ProfileResponse } from '@/rtk-query/profile/type';

export const ONBOARDING_SLICE_REDUCER_NAME = 'onboarding';

export type OnboardingStageType =
  | 'complete-profile'
  | 'subscription'
  | 'professional-profile';

interface OnboardingStageState {
  stage: OnboardingStageType;
  profilePic: string;
}

const initialState: OnboardingStageState = {
  stage: 'complete-profile',
  profilePic: '',
};

// Create the slice
const onboardingStageSlice = createSlice({
  name: ONBOARDING_SLICE_REDUCER_NAME,
  initialState,
  reducers: {
    setOnboardingStage: (state, action: PayloadAction<OnboardingStageType>) => {
      state.stage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      endpoints.getUserProfile.matchFulfilled,
      (state, action: PayloadAction<ProfileResponse>) => {
        state.profilePic = action.payload.data?.personal?.profile_image;
      }
    );
  },
});

export const { setOnboardingStage } = onboardingStageSlice.actions;

export const onboardingSliceReducer = onboardingStageSlice.reducer;
