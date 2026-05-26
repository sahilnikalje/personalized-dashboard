import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedItem } from '@/types';

interface FeedState {
  items: FeedItem[];
  cardOrder: string[];
}

const initialState: FeedState = {
  items: [],
  cardOrder: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedItems(state, action: PayloadAction<FeedItem[]>) {
      state.items = action.payload;
      state.cardOrder = action.payload.map((i) => i.id);
    },
    reorderCards(state, action: PayloadAction<string[]>) {
      state.cardOrder = action.payload;
    },
  },
});

export const { setFeedItems, reorderCards } = feedSlice.actions;
export default feedSlice.reducer;