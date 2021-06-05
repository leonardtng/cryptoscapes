import { createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Theme {
  darkMode: boolean;
}

const initialState: Theme = { darkMode: true };

export const selectTheme: (state: RootState) => Theme = (state: RootState) => state.theme;

const themeSlice: Slice<Theme, { toggle: (state: Theme) => void; }, 'theme'> = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state: Theme) => {
      const currentValue = state.darkMode;
      state.darkMode = currentValue ? false : true;
    }
  },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
