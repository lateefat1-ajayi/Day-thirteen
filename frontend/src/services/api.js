import axios from "axios";

const api = axios.create({
  baseURL: "https://day-thirteen.onrender.com",
  withCredentials: false, // CORS enabled on backend
});

export default api;
