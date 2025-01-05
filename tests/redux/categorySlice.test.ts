import categoryReducer, {
  setCategory,
  resetCategory,
  fetchCategories,
  fetchJokesByCategory,
} from '../../src/redux/categorySlice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { CategoryState } from '../../src/redux/categorySlice';
import MockAdapter from 'axios-mock-adapter';

describe('categorySlice', () => {
  const initialState: CategoryState = {
    categories: [],
    currentCategory: null,
    currentJoke: null,
    jokes: [],
    status: 'idle',
    error: null,
  };

  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  // Reducer Tests
  it('should handle setCategory', () => {
    const state = categoryReducer(initialState, setCategory('animal'));
    expect(state.currentCategory).toBe('animal');
    expect(state.jokes).toEqual([]);
  });

  it('should handle resetCategory', () => {
    const modifiedState: CategoryState = {
      ...initialState,
      currentCategory: 'animal',
      currentJoke: { id: '1', text: 'Test joke' },
      jokes: [{ id: '1', text: 'Test joke' }],
    };

    const state = categoryReducer(modifiedState, resetCategory());
    expect(state.currentCategory).toBeNull();
    expect(state.currentJoke).toBeNull();
    expect(state.jokes).toEqual([]);
  });

  // Async Thunk Tests
  it('should handle fulfilled fetchCategories', async () => {
    const mockCategories = ['animal', 'career', 'celebrity'];
    mock
      .onGet('https://api.chucknorris.io/jokes/categories')
      .reply(200, mockCategories);

    const store = configureStore({
      reducer: categoryReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchCategories() as any);

    const state = store.getState();
    expect(state.categories).toEqual(mockCategories);
  });

  it('should handle fulfilled fetchJokesByCategory', async () => {
    const mockJoke = {
      value: 'A funny joke about animals',
      id: '123',
    };

    mock
      .onGet('https://api.chucknorris.io/jokes/random', {
        params: { category: 'animal' },
      })
      .reply(200, mockJoke);

    const store = configureStore({
      reducer: categoryReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchJokesByCategory('animal') as any);

    const state = store.getState();
    expect(state.currentCategory).toBe('animal');
    expect(state.currentJoke).toEqual({
      id: '123',
      text: 'A funny joke about animals',
    });
    expect(state.jokes).toContainEqual({
      id: '123',
      text: 'A funny joke about animals',
    });
  });

  it('should not add duplicate jokes in fetchJokesByCategory', async () => {
    const mockJoke = {
      value: 'A funny joke about animals',
      id: '123',
    };

    mock
      .onGet('https://api.chucknorris.io/jokes/random', {
        params: { category: 'animal' },
      })
      .reply(200, mockJoke);

    const store = configureStore({
      reducer: categoryReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    // Dispatch the same joke twice
    await store.dispatch(fetchJokesByCategory('animal') as any);
    await store.dispatch(fetchJokesByCategory('animal') as any);

    const state = store.getState();
    expect(state.jokes).toHaveLength(1); // No duplicate jokes added
  });

  it('should handle rejected fetchCategories', async () => {
    mock.onGet('https://api.chucknorris.io/jokes/categories').reply(500);

    const store = configureStore({
      reducer: categoryReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchCategories() as any);

    const state = store.getState();
    expect(state.error).toBe('Request failed with status code 500');
  });

  it('should handle rejected fetchJokesByCategory', async () => {
    mock
      .onGet('https://api.chucknorris.io/jokes/random', {
        params: { category: 'animal' },
      })
      .reply(500);

    const store = configureStore({
      reducer: categoryReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    await store.dispatch(fetchJokesByCategory('animal') as any);

    const state = store.getState();
    expect(state.error).toBe('Request failed with status code 500');
  });
});
