import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

export const login = async (email, password) => {
  const { data } = await API.post('/login', { email, password });
  return data;
};
