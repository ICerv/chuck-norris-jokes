import axios from 'axios';

const API_BASE = 'https://api.chucknorris.io';

export const fetchRandomJoke = async () => {
  const response = await axios.get(`${API_BASE}/jokes/random`);
  return response.data;
};
