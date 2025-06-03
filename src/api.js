import axios from 'axios';

const API = axios.create({
  baseURL: 'https://70ef-110-137-38-7.ngrok-free.app/api', // Pastikan backend berjalan di localhost:6543
  withCredentials: true,  // Mengirimkan cookies jika perlu
});

// Menambahkan token jika ada di localStorage
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
