import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminLogin = (username, password) => {
  return api.post('/admin/login', { username, password });
};

export const registerUser = (formData) => {
  return api.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const searchUsers = (query) => {
  return api.get('/users/search', { params: { q: query } });
};

export const getUserDetails = (userId) => {
  return api.get(`/users/${userId}`);
};

export const downloadCV = (userId) => {
  return api.get(`/users/${userId}/cv`, {
    responseType: 'blob',
  });
};

export default api;
