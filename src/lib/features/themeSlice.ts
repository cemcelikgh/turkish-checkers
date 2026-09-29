import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Theme } from "@/types/types";

const initialState: {
  theme: Theme | undefined;
  themePreference: Theme | 'system';
} = {
  theme: undefined,
  themePreference: 'system',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setThemePreference: (state, action: PayloadAction<Theme | 'system'>) => {
      state.themePreference = action.payload;
    },
  },
});

export const { setTheme, setThemePreference } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectThemePreference = (state: RootState) => state.theme.themePreference;

export default themeSlice.reducer;
