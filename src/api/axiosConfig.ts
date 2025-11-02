import axios from "axios";

const API_BAE_URL = "http://localhost:8000/api";

// buat sebuah instance axios
const apiClient = axios.create({
  baseURL: API_BAE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;