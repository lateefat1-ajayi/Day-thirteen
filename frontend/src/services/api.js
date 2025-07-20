import axios from "axios";

const api = axios.create({
  baseURL: "https://day-thirteen.onrender.com",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


export const addBook = (bookData) => api.post("/books", bookData);
export const getBooks = () => api.get("/books");
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);
