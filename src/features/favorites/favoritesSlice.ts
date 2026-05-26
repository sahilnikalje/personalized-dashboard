import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedItem } from '@/types';

interface FavoritesState {
  items: FeedItem[];
}

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FeedItem>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) state.items.unshift(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;