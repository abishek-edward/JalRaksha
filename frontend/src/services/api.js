import axios from 'axios';

const API_URL = "https://jalraksha.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitPrediction = async (data) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    if (!navigator.onLine || error.code === 'ERR_NETWORK') {
      const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
      offlineQueue.push(data);
      localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
      throw new Error('You are offline. Data saved locally and will sync when connection is restored.');
    }
    throw error;
  }
};

export const fetchHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch(error) {
    console.error("Failed to fetch history");
    return [];
  }
};
