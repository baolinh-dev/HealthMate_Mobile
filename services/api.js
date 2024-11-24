import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5004' });

export const login = async (email, password) => {
  const { data } = await API.post('/api/auth/login', { email, password });
  return data;
};
