import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import feedReducer from '@/features/feed/feedSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import searchReducer from '@/features/search/searchSlice';
import preferencesReducer from '@/features/preferences/preferencesSlice';
import { newsApi } from '@/services/news/newsApi';
import { tmdbApi } from '@/services/tmdb/tmdbApi';

const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== 'undefined'
    ? require('redux-persist/lib/storage').default
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'preferences'],
};

const rootReducer = combineReducers({
  feed: feedReducer,
  favorites: favoritesReducer,
  search: searchReducer,
  preferences: preferencesReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(newsApi.middleware)
      .concat(tmdbApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;