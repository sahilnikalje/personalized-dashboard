import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
  selectedCategories: string[];
}

const initialState: PreferencesState = {
  selectedCategories: ['technology', 'entertainment', 'sports'],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const idx = state.selectedCategories.indexOf(action.payload);
      if (idx > -1) {
        state.selectedCategories.splice(idx, 1);
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
  },
});

export const { toggleCategory } = preferencesSlice.actions;
export default preferencesSlice.reducer;