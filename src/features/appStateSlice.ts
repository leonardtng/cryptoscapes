import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AppState } from '../models';

interface Reducers extends SliceCaseReducers<AppState> {
  toggle: (state: AppState) => void;
}

const initialState: AppState = { darkMode: true };

export const selectAppState: (state: RootState) => AppState = (state: RootState) => state.appState;

const appStateSlice: Slice<AppState, Reducers, 'theme'> = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state: AppState) => {
      const currentValue = state.darkMode;
      state.darkMode = currentValue ? false : true;
    }
  },
});

export const { toggle } = appStateSlice.actions;

export default appStateSlice.reducer;
