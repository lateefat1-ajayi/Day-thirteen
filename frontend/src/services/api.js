import axios from "axios";

const API = axios.create({
  baseURL: "https://day-thirteen.onrender.com",
  withCredentials: true,
});

export default API;
