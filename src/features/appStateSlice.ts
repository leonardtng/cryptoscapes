import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AppState } from '../models';

interface Reducers extends SliceCaseReducers<AppState> {
  setDarkMode: (state: AppState, action: PayloadAction<boolean>) => void;
}

const initialState: AppState = { darkMode: true };

export const selectAppState: (state: RootState) => AppState = (state: RootState) => state.appState;

const appStateSlice: Slice<AppState, Reducers, 'theme'> = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode: (state: AppState, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    }
  },
});

export const { setDarkMode } = appStateSlice.actions;

export default appStateSlice.reducer;
