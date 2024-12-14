import axios from 'axios';

const API_BASE = 'https://api.chucknorris.io';

export const fetchRandomJoke = async () => {
  const response = await axios.get(`${API_BASE}/jokes/random`);
  return {
    joke: response.data.value,
    iconUrl: response.data.icon_url,
  };
};

export const fetchJokeByQuery = async (query: string) => {
  const response = await axios.get(`${API_BASE}/jokes/search`, {
    params: { query },
  });

  if (response.data.total === 0) {
    throw new Error('No jokes found for the given query.');
  }

  const randomIndex = Math.floor(Math.random() * response.data.result.length);
  const selectedJoke = response.data.result[randomIndex];

  return {
    joke: selectedJoke.value,
    iconUrl: selectedJoke.icon_url,
  };
};
export const fetchJokeCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE}/jokes/categories`);
  return response.data;
};

export const fetchJokeByCategory = async (
  category: string,
): Promise<{ joke: string; iconUrl: string }> => {
  const response = await axios.get(`${API_BASE}/jokes/random`, {
    params: { category },
  });
  return {
    joke: response.data.value,
    iconUrl: response.data.icon_url,
  };
};
