import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Reducer path name start
export const ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME =
  'addProjectClient' as const;
// Reducer path name end

export const ADD_PROJECT_CLIENT_IMAGE = 'photo' as const;
export const ADD_PROJECT_CLIENT_GOAL = 'goal';
export const ADD_PROJECT_CLIENT_TITLE = 'title';
export const ADD_PROJECT_CLIENT_DESCRIPTION = 'description';
export const ADD_PROJECT_CLIENT_TASKS = 'tasks';
export const ADD_PROJECT_CLIENT_NOTES = 'notes';
// export const COMPLETE_PROFILE_PHONE = 'phone';
// export const COMPLETE_PROFILE_ADDRESS = 'address';
// export const COMPLETE_PROFILE_CITY = 'city';
// export const COMPLETE_PROFILE_PROVINCE = 'province';
// export const COMPLETE_PROFILE_POSTAL_CODE = 'postalCode';
// export const COMPLETE_PROFILE_PHOTO = 'photo';
// export const COMPLETE_PROFILE_INSURANCE = 'insurance';

type AddTask = {
  id: number;
  date: Date;
  title: string;
  content: string;
};

type AddNote = {
  id: number;
  title: string;
  date: Date;
  note: string;
};

const addProjectClientStages = [
  'summary',
  'tasks',
  'notes',
  'documents',
] as const;

export type AddProjectClientStageType = (typeof addProjectClientStages)[number];

export type AddProjectClientState = {
  stage: AddProjectClientStageType;
  currentStep: number;
  [ADD_PROJECT_CLIENT_GOAL]: string;
  [ADD_PROJECT_CLIENT_DESCRIPTION]: string;
  [ADD_PROJECT_CLIENT_TITLE]: string;
  [ADD_PROJECT_CLIENT_TASKS]: AddTask[];
  [ADD_PROJECT_CLIENT_NOTES]: AddNote[];
  // [COMPLETE_PROFILE_FIRST_NAME]: string;
  // [COMPLETE_PROFILE_LAST_NAME]: string;
  // [COMPLETE_PROFILE_BIO]: string;
  // [COMPLETE_PROFILE_PHONE]: string;
  // [COMPLETE_PROFILE_ADDRESS]: string;
  // [COMPLETE_PROFILE_CITY]: string;
  // [COMPLETE_PROFILE_PROVINCE]: string;
  // [COMPLETE_PROFILE_POSTAL_CODE]: string;
  [ADD_PROJECT_CLIENT_IMAGE]: File[];
  // [COMPLETE_PROFILE_INSURANCE]?: boolean;
};

export const addProjectClientInitialState: AddProjectClientState = {
  stage: 'summary',
  currentStep: 1,
  [ADD_PROJECT_CLIENT_IMAGE]: [],
  [ADD_PROJECT_CLIENT_GOAL]: '',
  [ADD_PROJECT_CLIENT_DESCRIPTION]: '',
  [ADD_PROJECT_CLIENT_TITLE]: '',
  [ADD_PROJECT_CLIENT_TASKS]: [],
  [ADD_PROJECT_CLIENT_NOTES]: [],
};

export const addProjectClientSlice = createSlice({
  name: ADD_PROJECT_CLIENT_SLICE_REDUCER_NAME,
  initialState: addProjectClientInitialState,
  reducers: {
    resetAddProjectClient: () => {
      return addProjectClientInitialState;
    },
    nextStep: (state) => {
      if (state.currentStep < addProjectClientStages.length) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateAddProjectClientState: (
      state,
      action: PayloadAction<Partial<AddProjectClientState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  resetAddProjectClient,
  updateAddProjectClientState,
  nextStep,
  prevStep,
} = addProjectClientSlice.actions;

export const addProjectClientReducer = addProjectClientSlice.reducer;
