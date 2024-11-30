import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from 'react';

import { endpoints as serviceEndpoints } from '@/rtk-query/services';
import { ProviderPortfolioType } from '@/rtk-query/services/services.types';

const dayMap: Record<string, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const SpecialistStages = ['home', 'payment', 'receipt'] as const;

export type SpecialistStagesType = (typeof SpecialistStages)[number];

type ServiceChallengeType = {
  id: number;
  service_id: number;
  name: string;
  Icon: ComponentType;
  color: string;
  href: string;
};

type SpecialistState = {
  stage: SpecialistStagesType;
  providerPortfolio: ProviderPortfolioType | null;
  challenge_id: number | null;
  provider_id: number | null;
  service_id: number | null;
  areas:
    | {
        id: number;
        name: string;
        Icon: ComponentType;
        color: string;
        href: string;
      }[];
  challenges: ServiceChallengeType[];
  availabilities: {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  }[];
};
const specialistsIniitialState: SpecialistState = {
  stage: 'home',
  providerPortfolio: null,
  challenge_id: null,
  provider_id: null,
  service_id: null,
  areas: [],
  challenges: [],
  availabilities: [],
};
const specialistSlice = createSlice({
  name: 'specialist',
  initialState: specialistsIniitialState,
  reducers: {
    updateSpecialistState: (
      state,
      action: PayloadAction<Partial<SpecialistState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      serviceEndpoints.getProviderPortfolio.matchFulfilled,
      (state, action: PayloadAction<ProviderPortfolioType>) => {
        state.providerPortfolio = action.payload;
      }
    );
    // builder.addMatcher(
    //   serviceEndpoints.getServicesChallenges.matchFulfilled,
    //   (state, action: PayloadAction<ChallengesType[]>) => {
    //     state.challenges =
    //       action.payload?.map((challenge) => {
    //         const { icon: Icon, color } = challengesMapping[challenge.name];
    //         const href = challenge.name.toLowerCase().replace(/\s+/g, '-');
    //         return {
    //           Icon,
    //           color,
    //           href,
    //           ...challenge,
    //         };
    //       }) || [];
    //     if (action.payload?.length > 0) {
    //       state.service_id = action.payload[0].service_id;
    //     }
    //   }
    // );
    // builder.addMatcher(
    //   providerEndpoints.getServices.matchFulfilled,
    //   (state, action: PayloadAction<ServiceType[]>) => {
    //     state.areas = action.payload?.map((area) => {
    //       const { icon: Icon, color, href } = categoriesMapping[area.name];
    //       return {
    //         Icon,
    //         color,
    //         href,
    //         ...area,
    //       };
    //     });
    //   }
    // );
    builder.addMatcher(
      serviceEndpoints.getProviderAvailabilityClient.matchFulfilled,
      (state, action) => {
        state.availabilities = action.payload.map((schedule) => ({
          id: schedule.id,
          day: dayMap[schedule.week_day],
          startTime: schedule.start_time.slice(0, -3), // Remove seconds
          endTime: schedule.end_time.slice(0, -3), // Remove seconds
        }));
      }
    );
  },
});

export const { updateSpecialistState } = specialistSlice.actions;

export const specialistReducer = specialistSlice.reducer;
