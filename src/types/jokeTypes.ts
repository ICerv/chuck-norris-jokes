export interface Joke {
  id: string;
  joke: string;
}

export interface JokeResponse {
  value: string;
  icon_url: string;
  categories?: string[];
}

export interface JokeResult {
  joke: string;
  iconUrl: string | null;
  category: string | null;
}

export interface JokeState {
  currentJoke: string;
  iconUrl: string | null;
  category: string | null;
}

export interface CategoriesState {
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface SearchState {
  query: string;
  results: JokeResult[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
