import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { endpoints as subscriptionEndpoints } from '@/rtk-query/subscription';

// Reducer path name start
export const SUBSCRIPTION_SLICE_REDUCER_NAME = 'subscription' as const;
// Reducer path name end

export const SUBSCRIPTION_PLAN = 'plan';
export const SUBSCRIPTION_PLAN_FREE_TRIAL = 'plan_free_trial';
export const SUBSCRIPTION_CARD_HOLDER_NAME = 'cardHolderName';
export const SUBSCRIPTION_CARD_NUMBER = 'cardNumber';
export const SUBSCRIPTION_EXPIRY_DATE = 'expiryDate';
export const SUBSCRIPTION_CVV = 'cvv';
export const SUBSCRIPTION_PROMO_CODE = 'promoCode';
export const SUBSCRIPTION_STUDENT_ID = 'studentId';
export const SUBSCRIPTION_DISCOUNT = 'discount';
export const SUBSCRIPTION_NEW_PRICE = 'promoPrice';

export const subscriptionStages = [
  'select-plan',
  'payment-details',
  'confirmation',
  'upload-student-id',
  'verify-student-mail',
] as const;

export type SubscriptionStagesType = (typeof subscriptionStages)[number];

export type PricingType = {
  title: string;
  description: React.ReactNode;
  price: string;
  features: { title: string; available: boolean }[];
  spotlight?: boolean;
  discount?: number;
};

export type SubscriptionType = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  billing_cycle: string;
  student_plan: boolean;
};

export type SubscriptionState = {
  stage: SubscriptionStagesType;
  [SUBSCRIPTION_PLAN]: SubscriptionType | null;
  [SUBSCRIPTION_PLAN_FREE_TRIAL]: boolean;
  [SUBSCRIPTION_CARD_HOLDER_NAME]: string;
  [SUBSCRIPTION_CARD_NUMBER]: string;
  [SUBSCRIPTION_EXPIRY_DATE]: string;
  [SUBSCRIPTION_CVV]: string;
  [SUBSCRIPTION_PROMO_CODE]: string;
  [SUBSCRIPTION_STUDENT_ID]: File[];
  [SUBSCRIPTION_DISCOUNT]: number;
  [SUBSCRIPTION_NEW_PRICE]: number;
};

export const subscriptionInitialState: SubscriptionState = {
  stage: 'select-plan',
  [SUBSCRIPTION_PLAN]: null,
  [SUBSCRIPTION_PLAN_FREE_TRIAL]: false,
  [SUBSCRIPTION_CARD_HOLDER_NAME]: '',
  [SUBSCRIPTION_CARD_NUMBER]: '',
  [SUBSCRIPTION_EXPIRY_DATE]: '',
  [SUBSCRIPTION_CVV]: '',
  [SUBSCRIPTION_PROMO_CODE]: '',
  [SUBSCRIPTION_STUDENT_ID]: [],
  [SUBSCRIPTION_DISCOUNT]: 0,
  [SUBSCRIPTION_NEW_PRICE]: 0,
};

export const subscriptionSlice = createSlice({
  name: SUBSCRIPTION_SLICE_REDUCER_NAME,
  initialState: subscriptionInitialState,
  reducers: {
    resetSubscriptionState: () => {
      return subscriptionInitialState;
    },

    updateSubscriptionState: (
      state,
      action: PayloadAction<Partial<SubscriptionState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      subscriptionEndpoints.applyCoupon.matchFulfilled,
      (state, action) => {
        state[SUBSCRIPTION_NEW_PRICE] = action.payload.new_price;
        state[SUBSCRIPTION_DISCOUNT] = action.payload.discount;
      }
    );
  },
});

export const { resetSubscriptionState, updateSubscriptionState } =
  subscriptionSlice.actions;

export const subscriptionReducer = subscriptionSlice.reducer;
