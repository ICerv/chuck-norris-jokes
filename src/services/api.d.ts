declare module 'services/api' {
  export const fetchJokeCategories: () => Promise<string[]>;
  export const fetchJokeByQuery: (query: string) => Promise<{
    joke: string;
    iconUrl: string | null;
    category: string | null;
  }>;
  export const fetchRandomJoke: () => Promise<{
    joke: string;
    iconUrl: string;
    category: string | null;
  }>;
  export const fetchJokeByCategory: (category: string) => Promise<{
    joke: string;
    iconUrl: string | null;
    category: string | null;
  }>;
}
