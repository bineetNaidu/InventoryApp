import axios from 'axios';

export const ax = axios.create({
  baseURL: 'http://localhost:4242/api/v1',
});
