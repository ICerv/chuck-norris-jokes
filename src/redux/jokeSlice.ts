import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JokeState {
  currentJoke: string;
  iconUrl: string | null;
  category: string | null;
}

const initialState: JokeState = {
  currentJoke: '',
  iconUrl: null,
  category: null,
};

const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    setJoke(
      state,
      action: PayloadAction<{
        joke: string;
        iconUrl: string | null;
        category: string | null;
      }>,
    ) {
      state.currentJoke = action.payload.joke;
      state.iconUrl = action.payload.iconUrl;
      state.category = action.payload.category;
    },
  },
});

export const { setJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
