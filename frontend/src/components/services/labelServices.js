import axios from 'axios';

const API_URL = 'http://localhost:3001/labels';

export const createLabel = async (name) => {
  try {
    const response = await axios.post(`${API_URL}/create`, { name });
    return response.data;
  } catch (error) {
    console.error('Create label error:', error);
    throw error;
  }
};

export const getAllLabels = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Get all labels error:', error);
    throw error;
  }
};
