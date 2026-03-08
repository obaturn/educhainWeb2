// api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = (email: string, password: string) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const register = (name: string, email: string, password: string, role: string, avatarFile?: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('role', role);
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
  return axios.post(`${API_URL}/auth/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const getCourses = (token?: string) =>
  axios.get(`${API_URL}/courses`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const getMentors = (token?: string) =>
  axios.get(`${API_URL}/mentors`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const getCommunity = (token?: string) =>
  axios.get(`${API_URL}/community`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const getRewards = (token?: string) =>
  axios.get(`${API_URL}/rewards`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

// Add more API calls as needed
