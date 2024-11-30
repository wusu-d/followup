import { createSlice } from '@reduxjs/toolkit';

import { endpoints as subscriptionsEndpoint } from '@/rtk-query/subscription';

export const PAYMENT_METHODS_SLICE_REDUCER_NAME = 'paymentMethod' as const;

export type PaymentMethodsType = {
  id: number;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  created_at: number;
  status: string;
};
export type PaymentMethodState = {
  paymentMethods: PaymentMethodsType[];
  publicKey: string;
  clientKey: string;
};

export const paymentMethodInitialState: PaymentMethodState = {
  paymentMethods: [
    // {
    //   id: 36,
    //   brand: 'visa',
    //   last4: '4242',
    //   exp_month: 9,
    //   exp_year: 2025,
    //   created_at: 1728560260,
    //   status: 'active',
    // },
  ],
  publicKey: '',
  clientKey: '',
};
const paymentMethodSlice = createSlice({
  name: PAYMENT_METHODS_SLICE_REDUCER_NAME,
  initialState: paymentMethodInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      subscriptionsEndpoint.listPaymentMethods.matchFulfilled,
      (state, action) => {
        state.paymentMethods = [...action.payload];
      }
    );

    builder.addMatcher(
      subscriptionsEndpoint.initializePayment.matchFulfilled,
      (state, action) => {
        state.publicKey = action.payload.stripe_public_key;
        state.clientKey = action.payload.client_secret;
      }
    );
  },
});

export const paymentMethodReducer = paymentMethodSlice.reducer;
