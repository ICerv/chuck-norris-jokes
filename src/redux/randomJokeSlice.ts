import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RandomJokeState {
  currentJoke: string;
  category: string | null;
  error: string | null;
}

const initialState: RandomJokeState = {
  currentJoke: '',
  category: null,
  error: null,
};

export const fetchRandomJoke = createAsyncThunk(
  'randomJoke/fetch',
  async () => {
    try {
      const categoriesResponse = await axios.get<string[]>(
        'https://api.chucknorris.io/jokes/categories',
      );
      const categories = categoriesResponse.data;
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const response = await axios.get(
        'https://api.chucknorris.io/jokes/random',
        {
          params: { category: randomCategory },
        },
      );

      return {
        joke: response.data.value,
        category: randomCategory,
      };
    } catch (error) {
      throw new Error('Failed to fetch a random joke.');
    }
  },
);

const randomJokeSlice = createSlice({
  name: 'randomJoke',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomJoke.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRandomJoke.fulfilled, (state, action) => {
        state.currentJoke = action.payload.joke;
        state.category = action.payload.category;
        state.error = null;
      })
      .addCase(fetchRandomJoke.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch joke';
      });
  },
});

export const randomJokeReducer = randomJokeSlice.reducer;
