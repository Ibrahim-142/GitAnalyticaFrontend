import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeUser = async (username) => {
  try {
    const response = await apiClient.get(`/analyze/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.detail || 'Failed to analyze user');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Make sure the backend is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('An error occurred during the analysis.');
    }
  }
};
