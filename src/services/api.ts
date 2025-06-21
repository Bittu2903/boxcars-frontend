import axios from 'axios';
import { UserModel } from '../types';

interface LoginResponse {
  token: string;
  user: UserModel;
}

interface AuthCheckResponse {
  user: UserModel;
}

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials: { email: string; password: string }) => {
  return api.post<LoginResponse>('/auth/login', credentials);
};

export const checkAuth = () => {
  return api.get<AuthCheckResponse>('/auth/me');
};

export const logout = () => {
  return api.post('/auth/logout');
};

export default api;