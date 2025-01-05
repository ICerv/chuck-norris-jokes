import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Joke {
  text: string;
  category: string;
}

export interface SearchState {
  results: Joke[];
  total: number;
  currentIndex: number;
  query: string;
  errorMessage: string | null;
}

const initialState: SearchState = {
  results: [],
  total: 0,
  currentIndex: 0,
  query: '',
  errorMessage: null,
};

export const fetchJokesByQuery = createAsyncThunk(
  'search/fetchByQuery',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://api.chucknorris.io/jokes/search',
        {
          params: { query },
        },
      );

      const jokes = response.data.result.map((joke: any) => ({
        text: joke.value,
      }));

      return { jokes, total: response.data.total };
    } catch (error) {
      return rejectWithValue('Failed to fetch jokes.');
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearError(state) {
      state.errorMessage = null;
    },
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    resetSearchState(state) {
      state.results = [];
      state.total = 0;
      state.query = '';
      state.currentIndex = 0;
      state.errorMessage = null;
    },
    nextJoke(state) {
      if (state.results.length > 0) {
        state.currentIndex = (state.currentIndex + 1) % state.results.length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokesByQuery.fulfilled, (state, action) => {
        if (action.payload.jokes.length > 0) {
          state.results = action.payload.jokes;
          state.total = action.payload.total;
          state.currentIndex = 0;
          state.query = action.meta.arg;
          state.errorMessage = null;
        } else {
          state.results = [];
          state.total = 0;
          state.query = action.meta.arg;
          state.errorMessage = `No results found for "${action.meta.arg}".`;
        }
      })
      .addCase(fetchJokesByQuery.rejected, (state, action) => {
        state.results = [];
        state.total = 0;
        state.query = '';
        state.errorMessage = action.payload as string;
      });
  },
});

export const { nextJoke, clearError, setSearchQuery, resetSearchState } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
