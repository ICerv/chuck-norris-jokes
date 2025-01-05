import { configureStore } from '@reduxjs/toolkit';
import { randomJokeReducer } from './randomJokeSlice';
import categoryReducer from './categorySlice';
import { searchReducer } from './searchSlice';

export const store = configureStore({
  reducer: {
    randomJoke: randomJokeReducer,
    categories: categoryReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>; // Infers the store's state type for use in `useSelector`
export type AppDispatch = typeof store.dispatch; // Infers dispatch type for use in `useDispatch`
