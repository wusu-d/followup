import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Reducer path name start
export const EDIT_PROFILE_SLICE_REDUCER_NAME = 'editProfile' as const;
// Reducer path name end

// export const ADD_PROJECT_CLIENT_IMAGE = 'photo' as const;
// export const ADD_PROJECT_CLIENT_GOAL = 'goal';
// export const ADD_PROJECT_CLIENT_TITLE = 'title';
// export const ADD_PROJECT_CLIENT_DESCRIPTION = 'description';
// export const ADD_PROJECT_CLIENT_TASKS = 'tasks';
// export const ADD_PROJECT_CLIENT_NOTES = 'notes';
// export const COMPLETE_PROFILE_PHONE = 'phone';
// export const COMPLETE_PROFILE_ADDRESS = 'address';
// export const COMPLETE_PROFILE_CITY = 'city';
// export const COMPLETE_PROFILE_PROVINCE = 'province';
// export const COMPLETE_PROFILE_POSTAL_CODE = 'postalCode';
// export const COMPLETE_PROFILE_PHOTO = 'photo';
// export const COMPLETE_PROFILE_INSURANCE = 'insurance';

// type AddTask = {
//   id: number;
//   date: Date;
//   title: string;
//   content: string;
// };

// type AddNote = {
//   id: number;
//   title: string;
//   date: Date;
//   note: string;
// };

const editProfileStages = [
  'home',
  'changeCard',
  'addSubscription',
  'confirmation',
] as const;

export type EditProfileStageType = (typeof editProfileStages)[number];

export type EditProfileState = {
  stage: EditProfileStageType;
};

export const editProfileInitialState: EditProfileState = {
  stage: 'home',
};

export const editProfileSlice = createSlice({
  name: EDIT_PROFILE_SLICE_REDUCER_NAME,
  initialState: editProfileInitialState,
  reducers: {
    resetEditProfileState: () => {
      return editProfileInitialState;
    },
    updateEditProfileState: (
      state,
      action: PayloadAction<Partial<EditProfileState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { resetEditProfileState, updateEditProfileState } =
  editProfileSlice.actions;

export const editProfileReducer = editProfileSlice.reducer;
