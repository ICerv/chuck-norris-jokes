import apiClient from './apiClient';

interface JokeResponse {
  value: string;
  icon_url: string;
  categories?: string[];
}

interface JokeResult {
  joke: string;
  iconUrl: string | null;
  category: string | null;
}

export const fetchRandomJoke = async (): Promise<JokeResult> => {
  try {
    const categoriesResponse =
      await apiClient.get<string[]>('/jokes/categories');
    const categories = categoriesResponse.data;

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const response = await apiClient.get<JokeResponse>('/jokes/random', {
      params: { category: randomCategory },
    });

    return {
      joke: response.data.value,
      iconUrl: response.data.icon_url,
      category: randomCategory,
    };
  } catch (error) {
    console.error('Error fetching random joke:', error);
    throw new Error('Failed to fetch a random joke. Please try again.');
  }
};

export const fetchJokeByQuery = async (query: string): Promise<JokeResult> => {
  try {
    const response = await apiClient.get<{
      total: number;
      result: JokeResponse[];
    }>('/jokes/search', { params: { query } });

    if (response.data.result.length === 0) {
      return {
        joke: 'No jokes found for the given query.',
        iconUrl: null,
        category: query,
      };
    }

    const randomIndex = Math.floor(Math.random() * response.data.result.length);
    const selectedJoke = response.data.result[randomIndex];

    return {
      joke: selectedJoke.value,
      iconUrl: selectedJoke.icon_url,
      category: query,
    };
  } catch (error) {
    console.error('Error fetching joke by query:', error);
    throw new Error('Failed to fetch jokes for the given query.');
  }
};

export const fetchJokeCategories = async (): Promise<string[]> => {
  try {
    const response = await apiClient.get<string[]>('/jokes/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching joke categories:', error);
    throw new Error('Failed to fetch joke categories.');
  }
};

export const fetchJokeByCategory = async (
  category: string,
): Promise<JokeResult> => {
  try {
    const response = await apiClient.get<JokeResponse>('/jokes/random', {
      params: { category },
    });

    return {
      joke: response.data.value,
      iconUrl: response.data.icon_url,
      category,
    };
  } catch (error) {
    console.error('Error fetching joke by category:', error);
    throw new Error('Failed to fetch joke by category.');
  }
};
