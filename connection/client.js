import { store } from "@/store";
import axios from "axios";

// Create an instance of Axios with a baseURL
const client = axios.create({
  baseURL: "https://api.fmb52.com", // Replace with your API base URL
  timeout: 10000, // Optional timeout configuration (in ms)
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here, e.g. Authorization
  },
});

client.interceptors.request.use((config) => {
  const user = store.getState().user;
  if (!user) return config;
  const token = user.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
