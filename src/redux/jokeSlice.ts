import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JokeState {
  currentJoke: string | null;
}

const initialState: JokeState = {
  currentJoke: null,
};

const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    setJoke(state, action: PayloadAction<string>) {
      state.currentJoke = action.payload;
    },
  },
});

export const { setJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
