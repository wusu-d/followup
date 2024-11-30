import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetClientResponse } from '@/rtk-query/projects/types';

// Reducer path name start
export const CLIENTS_SLICE_REDUCER_NAME = 'client' as const;
// Reducer path name end

export const CLIENT_DETAILS = 'clientDetails' as const;

export type ClientState = {
  [CLIENT_DETAILS]: GetClientResponse;
};

export const clientInitialState: ClientState = {
  [CLIENT_DETAILS]: {
    client_id: 0,
    full_name: '',
    status: '',
    challenge: '',
    service_category: '',
    progress_stage: {
      value: 0,
      unit: '', // Update with valid units as needed
    },
  },
};

export const clientSlice = createSlice({
  name: CLIENTS_SLICE_REDUCER_NAME,
  initialState: clientInitialState,
  reducers: {
    resetClientState: () => {
      return clientInitialState;
    },

    updateClientState: (state, action: PayloadAction<Partial<ClientState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetClientState, updateClientState } = clientSlice.actions;

export const clientSliceReducer = clientSlice.reducer;
