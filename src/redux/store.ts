import { configureStore } from '@reduxjs/toolkit';
import { randomJokeReducer } from './randomJokeSlice'; // Named export
import categoryReducer from './categorySlice'; // Default export
import { searchReducer } from './searchSlice'; // Named export

export const store = configureStore({
  reducer: {
    randomJoke: randomJokeReducer,
    categories: categoryReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Infers the store's state type for use in `useSelector`
export type AppDispatch = typeof store.dispatch; // Infers dispatch type for use in `useDispatch`
