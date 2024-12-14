import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JokeState {
  currentJoke: string | null;
  iconUrl: string | null;
}

const initialState: JokeState = {
  currentJoke: null,
  iconUrl: null,
};

const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    setJoke(state, action: PayloadAction<{ joke: string; iconUrl: string }>) {
      state.currentJoke = action.payload.joke;
      state.iconUrl = action.payload.iconUrl;
    },
  },
});

export const { setJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
