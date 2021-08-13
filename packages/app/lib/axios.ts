import axios from 'axios';

export const ax = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4242/api/v1',
});
