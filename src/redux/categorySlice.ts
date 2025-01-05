import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Joke {
  id: string;
  text: string;
}

export interface CategoryState {
  categories: string[];
  currentCategory: string | null;
  currentJoke: Joke | null;
  jokes: Joke[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  currentJoke: null,
  jokes: [],
  status: 'idle',
  error: null,
};

export const fetchJokesByCategory = createAsyncThunk(
  'categories/fetchJokesByCategory',
  async (category: string) => {
    const response = await axios.get(
      'https://api.chucknorris.io/jokes/random',
      {
        params: { category },
      },
    );
    return {
      id: response.data.id,
      joke: response.data.value,
      category,
    };
  },
);

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axios.get<string[]>(
      'https://api.chucknorris.io/jokes/categories',
    );
    return response.data;
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload;
      state.jokes = [];
    },

    resetCategory(state) {
      state.currentCategory = null;
      state.jokes = [];
      state.currentJoke = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(fetchJokesByCategory.fulfilled, (state, action) => {
        const { id, joke, category } = action.payload;
        const formattedJoke = { id, text: joke };
        if (!state.jokes.some((j) => j.id === formattedJoke.id)) {
          state.jokes.push(formattedJoke);
        }
        state.currentJoke = formattedJoke;
        state.currentCategory = category;
        state.error = null;
      })
      .addCase(fetchJokesByCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch jokes';
      });
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
