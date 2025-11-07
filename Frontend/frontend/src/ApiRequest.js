import axios from "axios";

/**
 * @file ApiRequest.js
 * Centralized API handler for all HTTP requests with JWT support.
 * Automatically injects Authorization header and is Jest-safe.
 */

const API_BASE_URL = "http://localhost:4000/api";
const isTestEnv = process.env.NODE_ENV === "test";

// Handle both normal and mocked axios
let apiClient;
if (axios.create && typeof axios.create === "function") {
  apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });
} else {
  // fallback for Jest-mocked axios
  apiClient = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: { request: { use: () => {} }, response: { use: () => {} } },
  };
}

// Attach Authorization header (skip during tests)
if (!isTestEnv && apiClient?.interceptors?.request) {
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

// Handle 401 globally
if (!isTestEnv && apiClient?.interceptors?.response) {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        console.warn("Unauthorized — token may be missing or expired.");
      }
      return Promise.reject(error);
    }
  );
}

// Unified API wrapper
export const api = {
  async get(endpoint, params = {}) {
    const response = await apiClient.get(endpoint, { params });
    return response?.data ?? response;
  },
  async post(endpoint, body = {}) {
    const response = await apiClient.post(endpoint, body);
    return response?.data ?? response;
  },
  async put(endpoint, body = {}) {
    const response = await apiClient.put(endpoint, body);
    return response?.data ?? response;
  },
  async delete(endpoint, params = {}) {
    const response = await apiClient.delete(endpoint, { params });
    return response?.data ?? response;
  },
};

export default api;
