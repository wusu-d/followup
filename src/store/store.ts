import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from '@/store/customStorage';

import {
  AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
} from '@/rtk-query/api.constants';
import { authenticatedGlobalApi } from '@/rtk-query/authenticatedGlobalApi';
import { unauthenticatedGlobalApi } from '@/rtk-query/unauthenticatedGlobalApi';
import {
  ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  addProjectClientReducer,
} from '@/slices/addproject-client';
import {
  APPOINTMENTS_SLICE_REDUCER_NAME,
  appointmentsReducer,
} from '@/slices/appointments.slice';
import {
  BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
  bookAppointmentReducer,
} from '@/slices/book-appointment.slice';
import {
  CLIENTS_SLICE_REDUCER_NAME,
  clientSliceReducer,
} from '@/slices/clients.slice';
import {
  COMPLETE_PROFILE_SLICE_REDUCER_NAME,
  completeProfileReducer,
} from '@/slices/complete-profile.slice';
import {
  EDIT_PROFILE_SLICE_REDUCER_NAME,
  editProfileReducer,
} from '@/slices/editProfile.slice';
import {
  ONBOARDING_SLICE_REDUCER_NAME,
  onboardingSliceReducer,
} from '@/slices/onboarding.slice';
import {
  PAYMENT_METHODS_SLICE_REDUCER_NAME,
  paymentMethodReducer,
} from '@/slices/paymentMethods.slice';
import {
  PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
  professionalProfileReducer,
} from '@/slices/professional-profile.slice';
import {
  SUBSCRIPTION_SLICE_REDUCER_NAME,
  subscriptionReducer,
} from '@/slices/service-provider-subscription.slice';
import { specialistReducer } from '@/slices/specialists.slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    COMPLETE_PROFILE_SLICE_REDUCER_NAME,
    SUBSCRIPTION_SLICE_REDUCER_NAME,
    PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME,
    BOOK_APPOINTMENT_SLICE_REDUCER_NAME,
    ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
    PAYMENT_METHODS_SLICE_REDUCER_NAME,
    ONBOARDING_SLICE_REDUCER_NAME,
    CLIENTS_SLICE_REDUCER_NAME,
    EDIT_PROFILE_SLICE_REDUCER_NAME,
    UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
    AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  ],
  whiteList: ['specialist', APPOINTMENTS_SLICE_REDUCER_NAME],
};

const rootReducer = combineReducers({
  [COMPLETE_PROFILE_SLICE_REDUCER_NAME]: completeProfileReducer,
  [SUBSCRIPTION_SLICE_REDUCER_NAME]: subscriptionReducer,
  [PROFESSIONAL_PROFILE_SLICE_REDUCER_NAME]: professionalProfileReducer,
  [BOOK_APPOINTMENT_SLICE_REDUCER_NAME]: bookAppointmentReducer,
  [ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME]: addProjectClientReducer,
  [CLIENTS_SLICE_REDUCER_NAME]: clientSliceReducer,
  specialist: specialistReducer,
  [EDIT_PROFILE_SLICE_REDUCER_NAME]: editProfileReducer,
  [ONBOARDING_SLICE_REDUCER_NAME]: onboardingSliceReducer,
  [PAYMENT_METHODS_SLICE_REDUCER_NAME]: paymentMethodReducer,
  [APPOINTMENTS_SLICE_REDUCER_NAME]: appointmentsReducer,
  [UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH]: unauthenticatedGlobalApi.reducer,
  [AUTHENTICATED_GLOBAL_API_REDUCER_PATH]: authenticatedGlobalApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const apiMiddleWare = [
  unauthenticatedGlobalApi.middleware,
  authenticatedGlobalApi.middleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleWare),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
