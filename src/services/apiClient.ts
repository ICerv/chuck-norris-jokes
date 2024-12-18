import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.chucknorris.io',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;