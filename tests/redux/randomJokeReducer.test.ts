import {
  randomJokeReducer,
  fetchRandomJoke,
} from '../../src/redux/randomJokeSlice';

describe('randomJokeReducer', () => {
  const initialState = {
    currentJoke: '',
    iconUrl: null,
    category: null,
    error: null,
  };

  it('should handle pending fetchRandomJoke', () => {
    const action = { type: fetchRandomJoke.pending.type };
    const expectedState = { ...initialState };
    expect(randomJokeReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle fulfilled fetchRandomJoke', () => {
    const action = {
      type: fetchRandomJoke.fulfilled.type,
      payload: {
        joke: 'Test joke',
        iconUrl: 'https://example.com/icon.png',
        category: 'test-category',
      },
    };
    const expectedState = {
      currentJoke: 'Test joke',
      iconUrl: 'https://example.com/icon.png',
      category: 'test-category',
      error: null,
    };
    expect(randomJokeReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle rejected fetchRandomJoke', () => {
    const action = {
      type: fetchRandomJoke.rejected.type,
      error: { message: 'Failed to fetch joke' },
    };
    const expectedState = {
      ...initialState,
      error: 'Failed to fetch joke',
    };
    expect(randomJokeReducer(initialState, action)).toEqual(expectedState);
  });
});
