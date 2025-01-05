import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  searchReducer,
  fetchJokesByQuery,
  nextJoke,
  clearError,
  setSearchQuery,
  resetSearchState,
  SearchState,
} from '../../src/redux/searchSlice';

describe('searchSlice', () => {
  const initialState: SearchState = {
    results: [],
    total: 0,
    currentIndex: 0,
    query: '',
    errorMessage: null,
  };

  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  // Reducer Tests
  it('should handle setSearchQuery', () => {
    const state = searchReducer(initialState, setSearchQuery('test'));
    expect(state.query).toBe('test');
  });

  it('should handle clearError', () => {
    const stateWithError: SearchState = {
      ...initialState,
      errorMessage: 'Error',
    };
    const state = searchReducer(stateWithError, clearError());
    expect(state.errorMessage).toBeNull();
  });

  it('should handle resetSearchState', () => {
    const modifiedState: SearchState = {
      results: [{ text: 'Joke 1', category: 'test' }],
      total: 1,
      currentIndex: 0,
      query: 'test',
      errorMessage: null,
    };
    const state = searchReducer(modifiedState, resetSearchState());
    expect(state).toEqual(initialState);
  });

  it('should handle nextJoke', () => {
    const modifiedState: SearchState = {
      results: [
        { text: 'Joke 1', category: 'test' },
        { text: 'Joke 2', category: 'test' },
      ],
      total: 2,
      currentIndex: 0,
      query: 'test',
      errorMessage: null,
    };
    const state = searchReducer(modifiedState, nextJoke());
    expect(state.currentIndex).toBe(1);
  });

  it('should loop back to the first joke when nextJoke is called on the last joke', () => {
    const modifiedState: SearchState = {
      results: [
        { text: 'Joke 1', category: 'test' },
        { text: 'Joke 2', category: 'test' },
      ],
      total: 2,
      currentIndex: 1,
      query: 'test',
      errorMessage: null,
    };
    const state = searchReducer(modifiedState, nextJoke());
    expect(state.currentIndex).toBe(0);
  });

  // Thunk Tests
  it('should handle fulfilled fetchJokesByQuery with results', async () => {
    const mockResponse = {
      total: 2,
      result: [{ value: 'Joke 1' }, { value: 'Joke 2' }],
    };

    mock
      .onGet('https://api.chucknorris.io/jokes/search', {
        params: { query: 'test' },
      })
      .reply(200, mockResponse);

    const store = configureStore({
      reducer: searchReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchJokesByQuery('test') as any);

    const state = store.getState();
    expect(state.results).toEqual([{ text: 'Joke 1' }, { text: 'Joke 2' }]);
    expect(state.total).toBe(2);
    expect(state.query).toBe('test');
    expect(state.errorMessage).toBeNull();
  });

  it('should handle fulfilled fetchJokesByQuery with no results', async () => {
    const mockResponse = { total: 0, result: [] };

    mock
      .onGet('https://api.chucknorris.io/jokes/search', {
        params: { query: 'test' },
      })
      .reply(200, mockResponse);

    const store = configureStore({
      reducer: searchReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchJokesByQuery('test') as any);

    const state = store.getState();
    expect(state.results).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.query).toBe('test');
    expect(state.errorMessage).toBe('No results found for "test".');
  });

  it('should handle rejected fetchJokesByQuery', async () => {
    mock
      .onGet('https://api.chucknorris.io/jokes/search', {
        params: { query: 'test' },
      })
      .reply(500);

    const store = configureStore({
      reducer: searchReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchJokesByQuery('test') as any);

    const state = store.getState();
    expect(state.results).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.query).toBe('');
    expect(state.errorMessage).toBe('Failed to fetch jokes.');
  });
});
