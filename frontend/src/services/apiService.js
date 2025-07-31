// frontend/src/api/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Asegúrate de que esta sea la URL de tu backend

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBooks = () => apiService.get('/libros');
export const getBooksByCategoryId = (categoryId) => apiService.get(`/libros/categoria/${categoryId}`);
export const getCategories = () => apiService.get('/categorias');

export default apiService;