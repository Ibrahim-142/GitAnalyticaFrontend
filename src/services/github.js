import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.request) {
    return 'No response from server. Make sure the backend is running.';
  }
  return error?.message || 'An error occurred';
};

export const analyzeUser = async (username) => {
  if (!username || typeof username !== 'string') {
    throw new Error('Username must be a non-empty string');
  }

  try {
    const response = await apiClient.get(`/analyze/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to analyze user: ${handleError(error)}`, { cause: error });
  }
};

export const compareUsers = async (user1, user2) => {
  if (!user1 || !user2 || typeof user1 !== 'string' || typeof user2 !== 'string') {
    throw new Error('Both usernames must be non-empty strings');
  }

  try {
    const response = await apiClient.get(`/compare/${user1}/${user2}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to compare users: ${handleError(error)}`, { cause: error });
  }
};

export const reviewPR = async (prUrl) => {
  if (!prUrl || typeof prUrl !== 'string') {
    throw new Error('PR URL must be a non-empty string');
  }

  try {
    const response = await apiClient.post('/review/pr-url', { url: prUrl });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to review PR: ${handleError(error)}`, { cause: error });
  }
};
